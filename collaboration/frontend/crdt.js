import { Editor } from '@tiptap/core';

import StarterKit from '@tiptap/starter-kit';

import Collaboration from '@tiptap/extension-collaboration';

import CollaborationCaret from '@tiptap/extension-collaboration-caret';

import Image from '@tiptap/extension-image';

import { Table } from '@tiptap/extension-table';

import { TableRow } from '@tiptap/extension-table-row';

import { TableHeader } from '@tiptap/extension-table-header';

import { TableCell } from '@tiptap/extension-table-cell';

import TaskList from '@tiptap/extension-task-list';

import TaskItem from '@tiptap/extension-task-item';

import Underline from '@tiptap/extension-underline';

import { HocuspocusProvider } from '@hocuspocus/provider';

import * as Y from 'yjs';


let editor = null;

let provider = null;

let ydoc = null;

let presenceHandler = null;


// ==========================================
// CLEANUP
// ==========================================

function destroy() {

    // Remove awareness listener

    if (presenceHandler && provider) {

        provider.awareness.off(
            'change',
            presenceHandler
        );

    }

    presenceHandler = null;


    // Destroy editor

    if (editor) {

        editor.destroy();

        editor = null;

    }


    // Destroy provider

    if (provider) {

        provider.destroy();

        provider = null;

    }


    // Destroy Yjs document

    if (ydoc) {

        ydoc.destroy();

        ydoc = null;

    }

}


// ==========================================
// USER COLOR GENERATOR
// ==========================================

function getUserColor(name) {

    const colors = [

        '#0F766E',
        '#2563EB',
        '#9333EA',
        '#DB2777',
        '#EA580C',
        '#0891B2',
        '#65A30D',
        '#7C3AED'

    ];

    let hash = 0;

    for (let i = 0; i < name.length; i++) {

        hash = ((hash << 5) - hash)
            + name.charCodeAt(i);

        hash |= 0;

    }

    return colors[
        Math.abs(hash) % colors.length
    ];

}


// ==========================================
// COLLABORATIVE EDITOR CONNECTION
// ==========================================

async function connect({

    id,

    initialHtml,

    permission,

    token,

    onStatus,

    onPresence

}) {

    // Clean previous connection

    destroy();


    const host = document.getElementById('ce');

    if (!host) {

        throw new Error(
            'Editor mount element #ce not found.'
        );

    }


    if (!token) {

        throw new Error(
            'User authentication token is missing.'
        );

    }


    // ======================================
    // STEP 1: REQUEST COLLABORATION TICKET
    // ======================================

    const response = await fetch(

        `/api/collaboration/ticket/${encodeURIComponent(id)}`,

        {

            method: 'POST',

            headers: {

                Authorization: `Bearer ${token}`,

                Accept: 'application/json'

            }

        }

    );


    const ticketData = await response
        .json()
        .catch(() => ({}));


    if (!response.ok) {

        throw new Error(

            ticketData.detail ||

            `Collaboration ticket request failed (${response.status})`

        );

    }


    // ======================================
    // STEP 2: VALIDATE DOCUMENT IDENTITY
    // ======================================

    const expectedDocumentName = `item:${id}`;

    if (
        ticketData.documentName !== expectedDocumentName
    ) {

        throw new Error(
            'Unexpected collaboration document identity.'
        );

    }


    // ======================================
    // STEP 3: READ COLLABORATION TOKEN
    // ======================================

    const collaborationToken =

        ticketData.ticket ||

        ticketData.token;


    if (
        !collaborationToken ||
        typeof collaborationToken !== 'string'
    ) {

        throw new Error(
            'Collaboration authentication token is missing.'
        );

    }


    // ======================================
    // STEP 4: VALIDATE WEBSOCKET URL
    // ======================================

    if (!ticketData.websocketUrl) {

        throw new Error(
            'Collaboration WebSocket URL is missing.'
        );

    }


    let websocketURL;

    try {

        websocketURL = new URL(
            ticketData.websocketUrl
        );

    } catch {

        throw new Error(
            'Invalid collaboration WebSocket URL.'
        );

    }


    if (

        websocketURL.protocol !== 'ws:' &&

        websocketURL.protocol !== 'wss:'

    ) {

        throw new Error(
            'Collaboration URL must use ws:// or wss://.'
        );

    }


    // ======================================
    // STEP 5: INITIALIZE YJS DOCUMENT
    // ======================================

    ydoc = new Y.Doc();


    // ======================================
    // STEP 6: PERMISSION CONTROL
    // ======================================

    const readOnly =

        permission !== 'edit' ||

        ticketData.readOnly === true;


    // ======================================
    // STEP 7: USER IDENTITY
    // ======================================

    const userName =

        window.PAWANSPACE_ME_NAME ||

        'PAWANSPACE User';


    const user = {

        name: userName,

        color: getUserColor(userName)

    };


    // ======================================
    // STEP 8: HOCUSPOCUS CONNECTION
    // ======================================

    provider = new HocuspocusProvider({

        url: ticketData.websocketUrl,

        name: ticketData.documentName,

        document: ydoc,

        token: collaborationToken,


        // Connection status

        onStatus: ({ status }) => {

            console.log(
                'PAWANSPACE Collaboration Status:',
                status
            );

            onStatus?.(status);

        },


        // Authentication failure

        onAuthenticationFailed: ({ reason }) => {

            console.error(
                'PAWANSPACE Authentication Failed:',
                reason
            );

            onStatus?.('authentication-failed');

        },


        // Connection closed

        onClose: ({ event }) => {

            console.warn(
                'PAWANSPACE Connection Closed:',
                event
            );

        },


        // Document synchronization

        onSynced: ({ state }) => {

            console.log(
                'PAWANSPACE Document Synced:',
                state
            );


            if (!state || !editor) {

                return;

            }


            const fragment = ydoc.getXmlFragment(
                'content'
            );


            // Initialize only an empty document

            if (fragment.length === 0) {

                editor.commands.setContent(

                    initialHtml || '<p></p>',

                    {

                        emitUpdate: false

                    }

                );

            }

        }

    });


    // ======================================
    // STEP 9: USER AWARENESS
    // ======================================

    provider.awareness.setLocalStateField(

        'user',

        user

    );


    // ======================================
    // STEP 10: INITIALIZE TIPTAP EDITOR
    // ======================================

    editor = new Editor({

        element: host,

        editable: !readOnly,


        extensions: [

            // Basic formatting

            StarterKit.configure({

                undoRedo: false,

                link: {

                    openOnClick: false,

                    autolink: true,

                    linkOnPaste: true

                }

            }),


            // Underline

            Underline,


            // Image support

            Image.configure({

                inline: false,

                allowBase64: true,

                HTMLAttributes: {

                    class: 'pawanspace-doc-image',

                    loading: 'lazy'

                }

            }),


            // Table support

            Table.configure({

                resizable: true,

                allowTableNodeSelection: true

            }),


            TableRow,

            TableHeader,

            TableCell,


            // Checklist support

            TaskList,


            TaskItem.configure({

                nested: true

            }),


            // Yjs collaboration

            Collaboration.configure({

                document: ydoc,

                field: 'content'

            }),


            // Collaborative cursors

            CollaborationCaret.configure({

                provider,

                user

            })

        ],


        // Editor attributes

        editorProps: {

            attributes: {

                class: 'ProseMirror',

                spellcheck: 'true'

            }

        },


        // Autosave/update callback

        onUpdate: () => {

            if (
                typeof window.chg === 'function'
            ) {

                window.chg();

            }

        }

    });


    // ======================================
    // STEP 11: LIVE USER PRESENCE
    // ======================================

    const updatePresence = () => {

        if (!provider) {

            return;

        }


        const users = Array.from(

            provider.awareness.getStates().values()

        )

            .map(state => state.user)

            .filter(user => user && user.name);


        const uniqueNames = [

            ...new Set(

                users.map(user => user.name)

            )

        ];


        onPresence?.(uniqueNames);

    };


    presenceHandler = updatePresence;


    provider.awareness.on(

        'change',

        presenceHandler

    );


    updatePresence();


    // ======================================
    // STEP 12: CONNECTION INFORMATION
    // ======================================

    console.log(

        'PAWANSPACE CRDT initialized:',

        ticketData.documentName

    );


    console.log(

        'Permission:',

        readOnly ? 'VIEW ONLY' : 'EDIT'

    );


    console.log(

        'Image Extension: Enabled'

    );


    console.log(

        'Table Extension: Enabled'

    );


    console.log(

        'Checklist Extension: Enabled'

    );


    // ======================================
    // STEP 13: RETURN CONNECTION OBJECT
    // ======================================

    return {

        editor,

        provider,

        ydoc

    };

}


// ==========================================
// GLOBAL PAWANSPACE CRDT API
// ==========================================

window.PAWANSPACECRDT = {

    connect,

    destroy,


    get editor() {

        return editor;

    },


    get provider() {

        return provider;

    },


    get ydoc() {

        return ydoc;

    }

};


// ==========================================
// MODULE READY EVENT
// ==========================================

window.PAWANSPACECRDTReady =

    Promise.resolve(
        window.PAWANSPACECRDT
    );


window.dispatchEvent(

    new Event(
        'pawanspace-crdt-ready'
    )

);