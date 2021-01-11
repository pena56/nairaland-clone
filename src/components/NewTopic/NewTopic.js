import { useState } from 'react';

import { Redirect } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './NewTopic.css';

import { useStateValue } from './../../StateProvider';
import { storage } from './../../firebaseConfig';

function NewTopic() {
  const [text, setText] = useState('');
  const [selectedFile, setSelectedFile] = useState();

  const [{ user }] = useStateValue();

  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadImage = () => {
    const ref = storage.ref();
    const fileRef = ref.child(selectedFile.name);
    fileRef
      .put(selectedFile)
      .then((snapshot) => {
        console.log('Upload successful');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      {user ? (
        <>
          {/* <p>Write New Topic</p>
          <input type="text" placeholder="Enter a Subject" />
          <hr />
          <p>body</p>
          <CKEditor
            editor={ClassicEditor}
            data={text}
            onChange={(e, editor) => {
              const data = editor.getData();
              setText(data);
            }}
          />
          <hr /> */}
          <input onChange={changeHandler} type="file" />
          <button onClick={uploadImage}>Upload image</button>
        </>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}

export default NewTopic;
