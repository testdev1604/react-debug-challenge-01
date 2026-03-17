import { useBooking } from '../context/BookingContext';

export default function FlightResults() {
  const { flights, passengerCount, selectFlight, resetBooking } = useBooking();

  return (
    <div className="flight-results">
      <div className="results-header">
        <h2>Available Flights</h2>
        <button
          className="btn btn-secondary"
          onClick={resetBooking}
          data-testid="back-to-search"
        >
          Back to Search
        </button>
      </div>

      <p className="results-subtitle">
        Showing {flights.length} flights &middot; {passengerCount}{' '}
        {passengerCount === 1 ? 'passenger' : 'passengers'}
      </p>

      <div className="flights-list">
        {flights.map((flight) => (
          <div key={flight.id} className="flight-card" data-testid="flight-card">
            <div className="flight-info">
              <span className="airline">{flight.airline}</span>
              <div className="flight-times">
                <span className="time">{flight.departure}</span>
                <span className="duration">{flight.duration}</span>
                <span className="time">{flight.arrival}</span>
              </div>
              <span className="route">
                {flight.from} &rarr; {flight.to}
              </span>
            </div>
            <div className="flight-price-action">
              <span className="price" data-testid="flight-price">
                ${flight.price}
              </span>
              <span className="per-person">per person</span>
              <button
                className="btn btn-primary"
                onClick={() => selectFlight(flight)}
                data-testid={`select-flight-${flight.id}`}
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
