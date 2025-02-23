if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/myword/service-worker.js')
        .then(registration => console.log('Service Worker registered:', registration))
        .catch(error => console.log('Service Worker registration failed:', error));
}

function saveText() {
    const text = document.getElementById('editor').value;
    localStorage.setItem('savedText', text);
    alert('Text saved!');
}

window.onload = function() {
    const savedText = localStorage.getItem('savedText');
    if (savedText) {
        document.getElementById('editor').innerHTML = savedText;
    }
};

// Save text automatically when user types
document.getElementById('editor').addEventListener('input', function() {
    localStorage.setItem('savedText', document.getElementById('editor').textContent);
});

// Load file content into the editor
function loadFile(event) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.html'; // Allow text and HTML files

    input.onchange = function(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('editor').value = e.target.result;
        };
        reader.readAsText (file);
    };
    input.click ();
}

async function saveFile() {
    // Check if the File System Access API is supported
    if ('showSaveFilePicker' in window) {
        try {
            // Define file options
            const options = {
                suggestedName: 'default-filename.txt',
                types: [
                    {
                        description: 'Text Files',
                        accept: { 'text/plain': ['.txt'] },
                    },
                ],
            };

            // Show save file picker
            const handle = await window.showSaveFilePicker(options);

            // Create a writable stream
            const writable = await handle.createWritable();

            // Get the content from the textarea
            const content = document.getElementById('editor').value;

            // Write the content to the file
            await writable.write(content);

            // Close the stream
            await writable.close();

            console.log('File saved successfully.');
        } catch (error) {
            console.error('Save operation failed:', error);
        }
    } else {
        // Fallback for unsupported browsers
        downloadFileFallback();
    }
}

function downloadFileFallback() {
    // Get the content from the textarea
    const content = document.getElementById('editor').value;

    // Create a blob with the content
    const blob = new Blob([content], { type: 'text/plain' });

    // Create an object URL for the blob
    const url = URL.createObjectURL(blob);

    // Create a link element
    const a = document.createElement('a');
    a.href = url;
    a.download = 'default-filename.txt';

    // Append the link to the document
    document.body.appendChild(a);

    // Programmatically click the link to trigger the download
    a.click();

    // Remove the link from the document
    document.body.removeChild(a);

    // Revoke the object URL
    URL.revokeObjectURL(url);
}

function newFile () {
    
    document.getElementById('editor').value = ""; // Clear content
    localStorage.removeItem('savedText'); // Remove saved data
}

window.onload = function() {
    // Load saved text on refresh
    const savedText = localStorage.getItem('savedText');
    if (savedText) {
        document.getElementById('editor').innerHTML = savedText;
    }

    // Fix modal elements and event listeners
    var modal = document.getElementById("hlpWin");
    var madol = document.getElementById("abtWin");
    var bta = document.getElementById("hlp");
   // var btb = document.getElementById("abt");
    // var spn = document.getElementById('hlpm');
    // var nps = document.getElementById('abtm');

    bta.onclick = function () {
        modal.style.display = 'block';
    };
    // btb.onclick = function () {
        // madol.style.display = 'block';
    // };
    // spn.onclick = function () {
     //    modal.style.display = 'none';
    // };
    // nps.onclick = function () {
     //   madol.style.display = 'none';
    // };
};

// Disable overscroll refresh on mobile
window.addEventListener('touchmove', function(event) {
    if (window.scrollY === 0) {
        event.preventDefault();
    }
}, { passive: false });