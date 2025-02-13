import { Provider } from 'react-redux';
import store from '@/stores';
import Clock from '@/components/visual-timer/clock.tsx';

function App() {

  return (
      <Provider store={ store }>
          <Clock durationInMinutes={25}/>
      </Provider>
  )
}

export default App
