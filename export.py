"""
PAWANSPACE document export utilities.

Converts editor HTML into DOCX and PDF while preserving common formatting:
headings, paragraphs, bold/italic/underline/strike, hyperlinks, ordered and
unordered lists, code blocks, checklists, tables, and embedded base64 images.

Public API (kept compatible with main.py):
    build_docx(title: str, html: str) -> bytes
    build_pdf(title: str, html: str) -> bytes
"""

from __future__ import annotations

import base64
import binascii
import html as html_lib
import io
import os
import re
from html.parser import HTMLParser
from typing import Any

E = os.environ.get

# Defensive limits: exported documents should not consume unbounded memory.
MAX_HTML_CHARS = 5_000_000
MAX_IMAGE_BYTES = 12 * 1024 * 1024
MAX_IMAGES = 100
MAX_TABLE_ROWS = 2_000
MAX_TABLE_COLS = 100


class Parse(HTMLParser):
    """Small, dependency-free parser for the editor's HTML subset."""

    BLOCK_TAGS = {"p", "div", "blockquote", "h1", "h2", "h3", "h4", "li"}

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.blocks: list[tuple[str, Any, Any]] = []
        self.runs: list[tuple[str, tuple[bool, bool, bool, bool, bool], str | None]] = []
        self.format_stack: list[tuple[str, str | None]] = []
        self.flags = {"b": 0, "i": 0, "u": 0, "s": 0, "c": 0}
        self.href: str | None = None
        self.lists: list[str] = []
        self.kind: tuple[str, Any] = ("p", 0)
        self.table: list[list[list[tuple[str, tuple[bool, bool, bool, bool, bool], str | None]]]] | None = None
        self.row: list[list[tuple[str, tuple[bool, bool, bool, bool, bool], str | None]]] | None = None
        self.cell: list[tuple[str, tuple[bool, bool, bool, bool, bool], str | None]] | None = None
        self.pre_depth = 0
        self.image_count = 0

    def _format(self) -> tuple[bool, bool, bool, bool, bool]:
        return tuple(self.flags[k] > 0 for k in ("b", "i", "u", "s", "c"))  # type: ignore[return-value]

    def add(self, text: str) -> None:
        target = self.cell if self.cell is not None else self.runs
        target.append((text, self._format(), self.href))

    def flush(self, keep_empty: bool = False) -> None:
        if self.cell is not None:
            return
        if keep_empty or any(text.strip() for text, _, _ in self.runs):
            self.blocks.append((self.kind[0], self.kind[1], self.runs))
        self.runs = []
        self.kind = ("p", 0)

    @staticmethod
    def _attrs(attrs: list[tuple[str, str | None]]) -> dict[str, str | None]:
        return dict(attrs)

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        a = self._attrs(attrs)

        if tag in ("h1", "h2", "h3", "h4"):
            self.flush()
            self.kind = ("h", min(int(tag[1]), 3))
        elif tag in ("p", "div", "blockquote"):
            self.flush()
            if tag == "blockquote":
                self.kind = ("quote", 0)
        elif tag == "br":
            self.add("\n")
        elif tag in ("ul", "ol"):
            if self.cell is None:
                self.flush()
            self.lists.append(tag)
        elif tag == "li":
            self.flush()
            self.kind = ("li", (len(self.lists), self.lists[-1] if self.lists else "ul"))
        elif tag in ("b", "strong"):
            self.flags["b"] += 1
        elif tag in ("i", "em"):
            self.flags["i"] += 1
        elif tag == "u":
            self.flags["u"] += 1
        elif tag in ("s", "strike", "del"):
            self.flags["s"] += 1
        elif tag == "code":
            self.flags["c"] += 1
        elif tag == "a":
            href = a.get("href")
            self.href = href if href and re.match(r"(?i)^(https?://|mailto:)", href.strip()) else None
        elif tag == "pre":
            self.flush()
            self.pre_depth += 1
            self.kind = ("pre", 0)
        elif tag == "input" and (a.get("type") or "").lower() == "checkbox":
            self.add("☑ " if "checked" in a else "☐ ")
        elif tag == "img":
            self._handle_image(a.get("src") or "")
        elif tag == "table":
            self.flush()
            self.table = []
        elif tag == "tr" and self.table is not None:
            self.row = []
        elif tag in ("td", "th") and self.row is not None:
            self.cell = []
            if tag == "th":
                self.flags["b"] += 1

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)
        if tag not in ("img", "input", "br", "hr"):
            self.handle_endtag(tag)

    def _handle_image(self, src: str) -> None:
        if self.cell is not None or self.image_count >= MAX_IMAGES:
            return
        match = re.match(r"(?is)^data:image/(png|jpe?g|gif|webp);base64,(.+)$", src.strip())
        if not match:
            return
        try:
            raw = base64.b64decode(match.group(2), validate=True)
            if not raw or len(raw) > MAX_IMAGE_BYTES:
                return
            self.flush()
            self.blocks.append(("img", match.group(1).lower(), raw))
            self.image_count += 1
        except (binascii.Error, ValueError):
            return

    def handle_endtag(self, tag: str) -> None:
        if tag in self.BLOCK_TAGS:
            self.flush()
        elif tag in ("ul", "ol"):
            self.flush()
            if self.lists:
                self.lists.pop()
        elif tag in ("b", "strong"):
            self.flags["b"] = max(0, self.flags["b"] - 1)
        elif tag in ("i", "em"):
            self.flags["i"] = max(0, self.flags["i"] - 1)
        elif tag == "u":
            self.flags["u"] = max(0, self.flags["u"] - 1)
        elif tag in ("s", "strike", "del"):
            self.flags["s"] = max(0, self.flags["s"] - 1)
        elif tag == "code":
            self.flags["c"] = max(0, self.flags["c"] - 1)
        elif tag == "a":
            self.href = None
        elif tag == "pre":
            self.flush()
            self.pre_depth = max(0, self.pre_depth - 1)
        elif tag in ("td", "th") and self.cell is not None:
            if tag == "th":
                self.flags["b"] = max(0, self.flags["b"] - 1)
            assert self.row is not None
            self.row.append(self.cell)
            self.cell = None
        elif tag == "tr" and self.row is not None:
            if self.table is not None:
                self.table.append(self.row)
            self.row = None
        elif tag == "table" and self.table is not None:
            if self.table:
                self.blocks.append(("table", 0, self.table[:MAX_TABLE_ROWS]))
            self.table = None

    def handle_data(self, data: str) -> None:
        if not self.pre_depth:
            data = re.sub(r"[ \t\r\n]+", " ", data)
        if data:
            self.add(data)


def blocks(source_html: str | None) -> list[tuple[str, Any, Any]]:
    """Parse editor HTML into normalized export blocks."""
    source_html = source_html or ""
    if len(source_html) > MAX_HTML_CHARS:
        raise ValueError("Document content is too large to export")
    parser = Parse()
    parser.feed(source_html)
    parser.close()
    parser.flush()
    return parser.blocks


# ---------------- DOCX ----------------

def _link(paragraph: Any, text: str, url: str, fmt: tuple[bool, bool, bool, bool, bool]) -> None:
    from docx.oxml import OxmlElement
    from docx.oxml.ns import qn

    relationship_id = paragraph.part.relate_to(
        url,
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
        is_external=True,
    )
    hyperlink = OxmlElement("w:hyperlink")
    hyperlink.set(qn("r:id"), relationship_id)

    run = OxmlElement("w:r")
    properties = OxmlElement("w:rPr")
    color = OxmlElement("w:color")
    color.set(qn("w:val"), "1A55CC")
    properties.append(color)
    underline = OxmlElement("w:u")
    underline.set(qn("w:val"), "single")
    properties.append(underline)
    if fmt[0]:
        properties.append(OxmlElement("w:b"))
    if fmt[1]:
        properties.append(OxmlElement("w:i"))
    if fmt[3]:
        properties.append(OxmlElement("w:strike"))
    run.append(properties)

    text_node = OxmlElement("w:t")
    text_node.text = text
    text_node.set(qn("xml:space"), "preserve")
    run.append(text_node)
    hyperlink.append(run)
    paragraph._p.append(hyperlink)


def _put(paragraph: Any, runs: list[tuple[str, tuple[bool, bool, bool, bool, bool], str | None]]) -> None:
    for text, fmt, href in runs:
        if href:
            _link(paragraph, text, href, fmt)
            continue
        run = paragraph.add_run(text)
        run.bold = fmt[0] or None
        run.italic = fmt[1] or None
        run.underline = fmt[2] or None
        run.font.strike = fmt[3] or None
        if fmt[4]:
            run.font.name = "Consolas"


def _set_cell_text(cell: Any, runs: list[tuple[str, tuple[bool, bool, bool, bool, bool], str | None]]) -> None:
    paragraph = cell.paragraphs[0]
    _put(paragraph, runs)


def build_docx(title: str, source_html: str) -> bytes:
    from docx import Document
    from docx.shared import Inches

    document = Document()
    document.core_properties.title = title or "PAWANSPACE document"
    document.add_heading(title or "Untitled document", 0)

    for kind, meta, data in blocks(source_html):
        if kind == "h":
            _put(document.add_heading("", level=meta), data)
        elif kind in ("p", "quote"):
            paragraph = document.add_paragraph()
            if kind == "quote":
                try:
                    paragraph.style = "Quote"
                except KeyError:
                    pass
            _put(paragraph, data)
        elif kind == "li":
            level, list_type = meta
            style = "List Bullet" if list_type == "ul" else "List Number"
            paragraph = document.add_paragraph(style=style)
            paragraph.paragraph_format.left_indent = Inches(min(max(level - 1, 0), 8) * 0.25)
            _put(paragraph, data)
        elif kind == "pre":
            paragraph = document.add_paragraph()
            paragraph.paragraph_format.left_indent = Inches(0.2)
            for text, _, _ in data:
                run = paragraph.add_run(text)
                run.font.name = "Consolas"
                run.font.size = 10
        elif kind == "img":
            try:
                document.add_picture(io.BytesIO(data), width=Inches(5.8))
            except Exception:
                # Unsupported/corrupt image data should not break the whole export.
                continue
        elif kind == "table" and data:
            max_cols = min(max((len(row) for row in data), default=0), MAX_TABLE_COLS)
            if not max_cols:
                continue
            table = document.add_table(rows=len(data), cols=max_cols)
            table.style = "Table Grid"
            for row_index, row in enumerate(data):
                for col_index, cell_runs in enumerate(row[:max_cols]):
                    _set_cell_text(table.cell(row_index, col_index), cell_runs)

    output = io.BytesIO()
    document.save(output)
    return output.getvalue()


# ---------------- PDF ----------------

def _font_path() -> str | None:
    """Find a Unicode TTF; FONT_PATH can explicitly override discovery."""
    configured = E("FONT_PATH")
    if configured and os.path.isfile(configured):
        return configured

    roots = [
        r"C:\Windows\Fonts",
        "/usr/share/fonts/truetype/dejavu",
        "/usr/share/fonts/truetype/noto",
        "/usr/share/fonts/truetype/lohit-devanagari",
        "/Library/Fonts",
        os.path.join(os.path.dirname(__file__), "fonts"),
    ]
    names = (
        "Nirmala.ttf",
        "NirmalaUI.ttf",
        "Lohit-Devanagari.ttf",
        "NotoSans-Regular.ttf",
        "DejaVuSans.ttf",
        "arial.ttf",
    )
    for root in roots:
        for name in names:
            candidate = os.path.join(root, name)
            if os.path.isfile(candidate):
                return candidate
    return None


def _register_pdf_fonts() -> tuple[str, str, str]:
    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont

    regular_name, bold_name, mono_name = "Helvetica", "Helvetica-Bold", "Courier"
    path = _font_path()
    if not path:
        return regular_name, bold_name, mono_name

    try:
        # Use stable names and avoid duplicate registration errors on repeated calls.
        registered = set(pdfmetrics.getRegisteredFontNames())
        if "PAWANSPACE-Regular" not in registered:
            pdfmetrics.registerFont(TTFont("PAWANSPACE-Regular", path))
        regular_name = "PAWANSPACE-Regular"

        directory, filename = os.path.split(path)
        stem, extension = os.path.splitext(filename)
        bold_candidates = [
            os.path.join(directory, stem.replace("Regular", "Bold") + extension),
            os.path.join(directory, stem + "-Bold" + extension),
            os.path.join(directory, "NirmalaB.ttf"),
            os.path.join(directory, "DejaVuSans-Bold.ttf"),
        ]
        bold_path = next((candidate for candidate in bold_candidates if candidate != path and os.path.isfile(candidate)), None)
        if bold_path:
            if "PAWANSPACE-Bold" not in registered:
                pdfmetrics.registerFont(TTFont("PAWANSPACE-Bold", bold_path))
            bold_name = "PAWANSPACE-Bold"
        else:
            bold_name = regular_name

        pdfmetrics.registerFontFamily(
            regular_name,
            normal=regular_name,
            bold=bold_name,
            italic=regular_name,
            boldItalic=bold_name,
        )
    except Exception:
        return "Helvetica", "Helvetica-Bold", "Courier"

    return regular_name, bold_name, "Courier"


def _pdf_markup(runs: list[tuple[str, tuple[bool, bool, bool, bool, bool], str | None]]) -> str:
    output: list[str] = []
    for text, fmt, href in runs:
        value = html_lib.escape(text).replace("\n", "<br/>")
        if fmt[4]:
            value = f'<font face="Courier">{value}</font>'
        if fmt[0]:
            value = f"<b>{value}</b>"
        if fmt[1]:
            value = f"<i>{value}</i>"
        if fmt[2]:
            value = f"<u>{value}</u>"
        if fmt[3]:
            value = f"<strike>{value}</strike>"
        if href:
            safe_href = html_lib.escape(href, quote=True)
            value = f'<link href="{safe_href}" color="#1a55cc">{value}</link>'
        output.append(value)
    return "".join(output).strip()


def build_pdf(title: str, source_html: str) -> bytes:
    from reportlab.lib import colors
    from reportlab.lib.enums import TA_LEFT
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
    from reportlab.lib.utils import ImageReader
    from reportlab.platypus import Image, KeepTogether, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

    regular_font, bold_font, mono_font = _register_pdf_fonts()
    styles = getSampleStyleSheet()

    body = ParagraphStyle(
        "PawanBody",
        parent=styles["BodyText"],
        fontName=regular_font,
        fontSize=10,
        leading=14,
        spaceAfter=6,
        alignment=TA_LEFT,
        wordWrap="CJK",
    )
    heading_styles = {
        1: ParagraphStyle("PawanH1", parent=styles["Heading1"], fontName=bold_font, fontSize=20, leading=25, spaceBefore=12, spaceAfter=7),
        2: ParagraphStyle("PawanH2", parent=styles["Heading2"], fontName=bold_font, fontSize=16, leading=21, spaceBefore=10, spaceAfter=6),
        3: ParagraphStyle("PawanH3", parent=styles["Heading3"], fontName=bold_font, fontSize=13, leading=17, spaceBefore=8, spaceAfter=5),
    }
    code_style = ParagraphStyle(
        "PawanCode",
        parent=body,
        fontName=mono_font,
        fontSize=8.5,
        leading=11,
        backColor=colors.HexColor("#F2F4F7"),
        borderColor=colors.HexColor("#D8DEE8"),
        borderWidth=0.5,
        borderPadding=6,
        spaceBefore=3,
        spaceAfter=8,
        wordWrap="CJK",
    )
    title_style = ParagraphStyle(
        "PawanTitle",
        parent=styles["Title"],
        fontName=bold_font,
        fontSize=24,
        leading=30,
        spaceAfter=16,
    )

    page_width, _ = A4
    usable_width = page_width - 100
    story: list[Any] = [Paragraph(html_lib.escape(title or "Untitled document"), title_style)]

    for kind, meta, data in blocks(source_html):
        if kind == "h":
            story.append(Paragraph(_pdf_markup(data), heading_styles[meta]))
        elif kind in ("p", "quote"):
            markup = _pdf_markup(data) or "&nbsp;"
            if kind == "quote":
                quote_style = ParagraphStyle(
                    "PawanQuote",
                    parent=body,
                    leftIndent=12,
                    borderColor=colors.HexColor("#CBD5E1"),
                    borderWidth=0,
                    borderPadding=4,
                    textColor=colors.HexColor("#475569"),
                )
                story.append(Paragraph(markup, quote_style))
            else:
                story.append(Paragraph(markup, body))
        elif kind == "li":
            level, list_type = meta
            bullet = "•" if list_type == "ul" else "1."
            list_style = ParagraphStyle(
                "PawanList",
                parent=body,
                leftIndent=14 * min(max(level, 1), 8),
                firstLineIndent=-9,
            )
            story.append(Paragraph(_pdf_markup(data) or "&nbsp;", list_style, bulletText=bullet))
        elif kind == "pre":
            code_text = "".join(text for text, _, _ in data)
            markup = html_lib.escape(code_text).replace("\n", "<br/>").replace(" ", "&nbsp;")
            story.append(Paragraph(markup or "&nbsp;", code_style))
        elif kind == "img":
            try:
                image_stream = io.BytesIO(data)
                image_width, image_height = ImageReader(image_stream).getSize()
                if image_width > 0 and image_height > 0:
                    scale = min(1.0, usable_width / image_width, 650 / image_height)
                    image_stream.seek(0)
                    story.append(KeepTogether([Image(image_stream, image_width * scale, image_height * scale), Spacer(1, 8)]))
            except Exception:
                continue
        elif kind == "table" and data:
            column_count = min(max((len(row) for row in data), default=0), MAX_TABLE_COLS)
            if not column_count:
                continue
            table_rows = []
            for row in data[:MAX_TABLE_ROWS]:
                cells = [
                    Paragraph(_pdf_markup(cell_runs) or "&nbsp;", body)
                    for cell_runs in row[:column_count]
                ]
                cells.extend([""] * (column_count - len(cells)))
                table_rows.append(cells)

            table = Table(
                table_rows,
                colWidths=[usable_width / column_count] * column_count,
                repeatRows=1,
                hAlign="LEFT",
            )
            table.setStyle(
                TableStyle(
                    [
                        ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
                        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#EEF2F7")),
                        ("VALIGN", (0, 0), (-1, -1), "TOP"),
                        ("LEFTPADDING", (0, 0), (-1, -1), 6),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                        ("TOPPADDING", (0, 0), (-1, -1), 5),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                    ]
                )
            )
            story.extend([table, Spacer(1, 8)])

    output = io.BytesIO()
    document = SimpleDocTemplate(
        output,
        pagesize=A4,
        leftMargin=50,
        rightMargin=50,
        topMargin=50,
        bottomMargin=50,
        title=title or "PAWANSPACE document",
        author="PAWANSPACE",
        pageCompression=1,
    )
    document.build(story)
    return output.getvalue()
