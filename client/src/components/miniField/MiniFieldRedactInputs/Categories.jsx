import React, { useState, useContext, useEffect } from 'react'
import * as adminApi from '../../../api/adminApi'
import { AppContext } from '../../AppContext'
import MyButton from '../../myButton/MyButton'

const Categories = ({ windowDisplay }) => {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [id, setId] = useState('')
    const [windowMessage, setWindowMessage] = useState('')
    const [windowTitle, setWindowTitle] = useState('')
    const { setIsVisible, setElements } = useContext(AppContext);

    useEffect(() => {
        setElements([
          { type: 'h1', text: windowTitle },
          { type: 'p', text: windowMessage },
          { type: 'button',
            text: 'Ok',
            scaleFrom: 1,
            scaleTo: 1.2,
            onClick: () => setIsVisible(false)
          },
        ]);
      }, [windowMessage]);

    const save = async () => {
        switch (windowDisplay) {
            case 'Create':
                try {
                    const result = await adminApi.createCategory(name, image)
                    if (result.status === 200) {
                        setWindowTitle('Success')
                        setWindowMessage('You created a category')
                        setIsVisible(true)
                    }
                } catch (error) {
                    setWindowTitle('Error')
                    setWindowMessage("Something gone wrong, check the console")
                    setIsVisible(true)
                    console.error('Error fetching data:', error);
                    throw error;
                }
                break;
            case 'Update':
                try {
                    const result = await adminApi.updateCategory(id, name, image)
                    if (result.status === 200) {
                        setWindowTitle('Success')
                        setWindowMessage('You updated a category')
                        setIsVisible(true)
                    }
                } catch (error) {
                    setWindowTitle('Error')
                    setWindowMessage("Something gone wrong, check the console")
                    setIsVisible(true)
                    console.error('Error fetching data:', error);
                    throw error;
                }
                break;
            case 'Delete':
                try {
                    const result = await adminApi.deleteCategory(id)
                    if (result.status === 200) {
                        setWindowTitle('Success')
                        setWindowMessage('You deleted a category')
                        setIsVisible(true)
                    }
                } catch (error) {
                    setWindowTitle('Error')
                    setWindowMessage("Something gone wrong, check the console")
                    setIsVisible(true)
                    console.error('Error fetching data:', error);
                    throw error;
                }
                break;
        }
    }

    return (
        <>  
            {windowDisplay !== 'Create' &&             
                <div className='mini-field-list-row loading'>
                    <p className='mini-field-list-redact-text' >Id:</p>
                    <input
                        className='mini-field-list-redact-input'
                        placeholder='Empty'
                        value={id}
                        onChange={(event) => setId(event.target.value)}
                    />
                </div>
            }
            {windowDisplay !== 'Delete' &&
                <> 
                    <div className='mini-field-list-row loading'>
                        <p className='mini-field-list-redact-text'>Name:</p> 
                        <input 
                            className='mini-field-list-redact-input' 
                            placeholder='Empty'   
                            value={name} 
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className='mini-field-list-row'>
                        <p className='mini-field-list-redact-text'>Image:</p> 
                        <input
                            className='mini-field-list-text' 
                            type='file' 
                            style={{marginTop: 12}} 
                            onChange={(event) => {
                                const file = event.target.files[0];
                                setImage(file);
                            }}
                        />
                    </div>
                </>
            }
            <MyButton 
                className='mini-field-button right'
                scaleFrom={1} 
                scaleTo={1.2}
                onClick={()=> save()}
            >
                <>Save</>
            </MyButton> 
        </>
    )
}

export default Categories