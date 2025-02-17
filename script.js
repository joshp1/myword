if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/projects/alpha/webTextEditor/service-worker.js')
        .then(registration => console.log('Service Worker registered:', registration))
        .catch(error => console.log('Service Worker registration failed:', error));
}

function saveText() {
    const text = document.getElementById('editor').textContent;
    localStorage.setItem('savedText', text);
    alert('Text saved!');
}

window.onload = function() {
    const savedText = localStorage.getItem('savedText');
    if (savedText) {
        document.getElementById('editor').textContent = savedText;
    }
};

// Save text automatically when user types
document.getElementById('editor').addEventListener('input', function() {
    localStorage.setItem('savedText', document.getElementById('editor').textContent);
});

// Load file content into the editor
function loadFile(event) {
    if (!event || !event.target || !event.target.files) return; // Ensure event is valid
    const file = event.target.files[0]; // Get the selected file
    if (!file) return; // If no file is selected, exit

    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('editor').textContent = e.target.result;
        localStorage.setItem('savedText', e.target.result); // Save to localStorage
    };
    reader.readAsText(file);
}
function saveFile() {
    const content = document.getElementById('editor').textContent;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'document.txt';
    link.click();
}

function newFile () {
    newF = document.getElementById ('editor').textContent = "";
}

var modal=document.getElementById ("hlpWin");
var madol=document.getElementById ("abtWin");
var bta = document.getElementById ("hlp");
var btb = document.getElementById ("abt");

var spn = document.getElementById ('hlpm');
var nps = document.getElementById ('abtm');

bta.onclick = function () {
    modal.style.display = 'block';
}
btb.onclick = function () {
    madol.style.display = 'block';
}
spn.onclick = function () {
    modal.style.display = 'none';
}
nps.onclick = function () {
    madol.style.display = 'none';
}