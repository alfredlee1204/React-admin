import { useEffect } from 'react';
import './App.css'
import { RouterContent } from './router'
import { useMessage } from './store/rootProvider';

function App() {
  const { saveMessageData } = useMessage()
  useEffect(() => {
    const listener = (ev: any) => {
      ev.preventDefault();
      saveMessageData()
    };
    window.addEventListener('beforeunload', listener);
    return () => {
      window.removeEventListener('beforeunload', listener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <RouterContent></RouterContent>
    </>
  )
}

export default App
