import { useBooking } from '../context/BookingContext';

const CITIES = [
  'New York (JFK)',
  'Los Angeles (LAX)',
  'Chicago (ORD)',
  'San Francisco (SFO)',
  'Miami (MIA)',
  'Seattle (SEA)',
  'Denver (DEN)',
  'Boston (BOS)',
];

export default function SearchForm() {
  const {
    origin,
    setOrigin,
    destination,
    setDestination,
    date,
    setDate,
    passengerCount,
    setPassengerCount,
    searchFlights,
  } = useBooking();

  const canSearch = origin && destination && date && origin !== destination;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSearch) searchFlights();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h2>Find Your Flight</h2>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="origin">From</label>
          <select
            id="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            data-testid="origin-select"
          >
            <option value="">Select origin</option>
            {CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="destination">To</label>
          <select
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            data-testid="destination-select"
          >
            <option value="">Select destination</option>
            {CITIES.filter((c) => c !== origin).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            data-testid="date-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="passengers">Passengers</label>
          <select
            id="passengers"
            value={passengerCount}
            onChange={(e) => setPassengerCount(Number(e.target.value))}
            data-testid="passengers-select"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? 'passenger' : 'passengers'}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={!canSearch}
        data-testid="search-btn"
      >
        Search Flights
      </button>
    </form>
  );
}
