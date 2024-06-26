// Get DOM elements
const inputFields = document.getElementById('input-fields');
const addFieldButton = document.getElementById('add-field');
const preview = document.getElementById('signature-preview');
const copyButton = document.getElementById('copy-button');
const textColor = document.getElementById('text-color');

// Default fields for the signature
const defaultFields = [
    { name: 'name', label: 'Name', placeholder: 'John Doe' },
    { name: 'job-title', label: 'Job Title', placeholder: 'Software Engineer' },
    { name: 'company', label: 'Company', placeholder: 'Tech Corp' },
    { name: 'email', label: 'Email', placeholder: 'john@example.com' },
    { name: 'phone', label: 'Phone', placeholder: '+1 (555) 123-4567' },
    { name: 'website', label: 'Website', placeholder: 'https://www.example.com' }
];

// Function to create input fields dynamically
function createField(field) {
    const fieldContainer = document.createElement('div');
    fieldContainer.className = 'field-container';

    const input = document.createElement('input');
    input.type = 'text';
    input.name = field.name;
    input.placeholder = field.placeholder;
    input.addEventListener('input', updateSignature);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-field';
    deleteButton.onclick = () => {
        inputFields.removeChild(fieldContainer);
        updateSignature();
    };

    fieldContainer.appendChild(input);
    fieldContainer.appendChild(deleteButton);

    return fieldContainer;
}

// Function to add a new field dynamically
function addField() {
    const fieldName = prompt('Enter field name:');
    if (fieldName) {
        const newField = {
            name: fieldName.toLowerCase().replace(/\s+/g, '-'),
            label: fieldName,
            placeholder: `Enter ${fieldName}`
        };
        inputFields.appendChild(createField(newField));
        updateSignature();
    }
}

// Function to update the signature preview based on input fields
function updateSignature() {
    const fields = Array.from(inputFields.querySelectorAll('input')).map(input => ({
        name: input.name,
        value: input.value || input.placeholder
    }));
    const txtColor = textColor.value || '#000000'; // Default to black if no color is selected

    const signatureHTML = `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; color: ${txtColor};">
    <tr>
        <td style="padding-bottom: 10px; border-bottom: 1px solid ${txtColor};">
            <strong style="font-size: 16px;">${fields.find(f => f.name === 'name').value}</strong><br>
            ${fields.find(f => f.name === 'job-title').value} | ${fields.find(f => f.name === 'company').value}
        </td>
    </tr>
    <tr>
        <td style="padding-top: 10px;">
            ${fields.filter(f => !['name', 'job-title', 'company'].includes(f.name)).map(field => 
                `${field.name === 'email' ? `<a href="mailto:${field.value}" style="color: ${txtColor}; text-decoration: none;">${field.value}</a>` :
                  field.name === 'website' ? `<a href="${field.value}" style="color: ${txtColor}; text-decoration: none;">${field.value}</a>` :
                  field.value}`
            ).join('<br>')}
        </td>
    </tr>
</table>`;
    
    preview.innerHTML = signatureHTML;
}

// Initialize default fields
defaultFields.forEach(field => inputFields.appendChild(createField(field)));

// Event listeners
addFieldButton.addEventListener('click', addField);
copyButton.addEventListener('click', () => {
    const range = document.createRange();
    range.selectNodeContents(preview);
    
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    
    document.execCommand('copy');
    selection.removeAllRanges();
    
    alert('Signature copied to clipboard! You can now paste it directly.');
});
textColor.addEventListener('input', updateSignature);

// Set initial text color to black
textColor.value = '#000000';

// Initial update of the signature preview
updateSignature();
