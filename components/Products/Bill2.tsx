// Bill.tsx
import React, { useRef, forwardRef, useImperativeHandle } from 'react';

const Bill2 = forwardRef((_, ref) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handlePrint = () => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const doc = iframe.contentDocument || iframe.contentWindow?.document;

        if (doc) {
            doc.open();
            doc.write(`
                <html>
                    <head>
                        <title>Print Bill</title>
                        <style>
                            body { font-family: Arial, sans-serif; }
                            h1 { color: #333; }
                            /* Add any other styles you want for printing */
                        </style>
                    </head>
                    <body>
                        <div>
                            ${document.getElementById('bill-content')?.innerHTML}
                        </div>
                    </body>
                </html>
            `);
            doc.close();

            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
        }
    };

    // Expose the handlePrint function to the parent component
    useImperativeHandle(ref, () => ({
        handlePrint,
    }));

    return (
        <>
            <div id="bill-content" style={{ display: 'none' }}>
                <h1>Bill Details</h1>
                <p>Item 1: $10</p>
                <p>Item 2: $20</p>
                <p>Total: $30</p>
            </div>

            {/* Hidden iframe for printing */}
            <iframe
                ref={iframeRef}
                style={{ display: 'none' }}
                title="Print Bill"
            />
        </>
    );
});

export default Bill2;
