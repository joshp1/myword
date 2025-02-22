if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/myword/service-worker.js')
        .then(registration => console.log('Service Worker registered:', registration))
        .catch(error => console.log('Service Worker registration failed:', error));
}

function saveText() {
    const text = document.getElementById('editor').innerHTML;
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

function saveFile() {
    const content = document.getElementById('editor').value;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'document.txt';
    link.click();
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