export const API_BASE_URL = typeof window !== 'undefined' && window.location.origin 
  ? window.location.origin 
  : process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

// Word-like toolbar options
export const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    [{ font: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ align: [] }],
    ['link', 'image'],
    ['clean']
  ]
};

export const quillFormats = [
  'header','font','bold','italic','underline','strike',
  'color','background','list','bullet','indent','align',
  'link','image'
];
