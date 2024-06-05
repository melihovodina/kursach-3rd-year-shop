import React, { useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { signIn } from '../../api/userApi';
import { AppContext } from '../../components/AppContext';
import FallingDots from '../../components/fallingDots/FallingDots'
import Loading from '../../components/Loading';
import MyButton from '../../components/myButton/MyButton';
import Window from '../../components/window/Window';
import './login.css'

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [windowMessage, setWindowMessage] = useState('');
  const { setIsLogged, setIsVisible, setElements, setLoading, loading } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    setElements([
      { type: 'h1', text: 'Error' },
      { type: 'p', text: windowMessage },
      { type: 'button',
        text: 'Ok',
        scaleFrom: 1,
        scaleTo: 1.2,
        onClick: () => setIsVisible(false)
      },
    ]);
  }, [windowMessage]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if(email.length > 3 && password.length > 3) {
        const response = await signIn(email, password);
        if (response.status === 200) {
          setLoading(false)
          setIsLogged(true)
          navigate('/main')
        }
      } else {
        setWindowMessage('Email and password must contain from 3 to 32 characters')
        setLoading(false)
        setIsVisible(true)
      }
    } catch (error) {
      setLoading(false);
      setWindowMessage('Incorrect email or password')
      setLoading(false)
      setIsVisible(true)
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  return (
    <div className='login-main'>
      <FallingDots/>
      <Loading loading={loading} loadingClass="loading">
        <Window/>
        <div className='login-field loading'>
          <div className='login-header'>
            <h1 className='login-title'>Sign In</h1>
            <MyButton 
            className='login-exit-button'
            childrenClassName='login-cross'
            scaleFrom={1} 
            scaleTo={1.2}
            childrenScaleFromForBig={2} 
            childrenScaleToForBig={2.2} 
            colorFrom="white" 
            colorTo="rgb(233, 0, 0)"
            onClick={() => navigate('/main')}
            >
              <CloseRoundedIcon/>
            </MyButton>
          </div>
          <input 
          className='login-input' 
          placeholder='Email'
          maxLength={32} 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          /> 
          <input 
          className='login-input' 
          type='password' 
          placeholder='Password' 
          maxLength={32}
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          />
          <p className='login-text' onClick={() => navigate('/signUp')}>
            Don't have an account yet? Join to us
          </p>
          <MyButton 
            className='login-button'
            childrenClassName='login-check' 
            scaleFrom={1} 
            scaleTo={1.2}
            childrenScaleFrom={2} 
            childrenScaleTo={2.2}
            childrenScaleFromForBig={3} 
            childrenScaleToForBig={3.2} 
            colorFrom="white" 
            colorTo="rgb(140, 233, 0)"
            onClick={() => handleSubmit()}
          >
            <CheckRoundedIcon fontSize='large'/>
          </MyButton>
        </div>
      </Loading>
    </div>
  )
}

export default SignIn