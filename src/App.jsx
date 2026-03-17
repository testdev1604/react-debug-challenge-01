import { useBooking } from './context/BookingContext';
import SearchForm from './components/SearchForm';
import FlightResults from './components/FlightResults';
import BookingSummary from './components/BookingSummary';
import './App.css';

function App() {
  const { step } = useBooking();

  return (
    <div className="app">
      <header className="app-header">
        <h1>&#9992; SkyBooker</h1>
        <p>Find and book your perfect flight</p>
      </header>

      <main className="app-main">
        {step === 'search' && <SearchForm />}
        {step === 'results' && <FlightResults />}
        {step === 'summary' && <BookingSummary />}
      </main>

      <footer className="app-footer">
        <p>&copy; 2026 SkyBooker. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
