import logo from './logo.svg';
import './App.css';
import Index from './components/index';
Number.prototype.format = function(n, x, s, c) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
       num = this.toFixed(Math.max(0, ~~n));
  
  return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
  };
function App() {
  return (
    <div className='wrap-dev'>
      <Index/>
    </div>
  );
}

export default App;
