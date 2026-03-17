import { useState } from 'react';
import { useBooking } from '../context/BookingContext';

export default function BookingSummary() {
  const {
    selectedFlight,
    passengerCount,
    setPassengerCount,
    confirmed,
    confirmBooking,
    goToResults,
    resetBooking,
  } = useBooking();

  const [passengers] = useState(passengerCount);

  if (!selectedFlight) return null;

  const totalPrice = selectedFlight.price * passengers;

  if (confirmed) {
    return (
      <div className="booking-confirmed">
        <div className="confirm-icon">&#10003;</div>
        <h2>Booking Confirmed!</h2>
        <p>
          Your flight with <strong>{selectedFlight.airline}</strong> has been
          booked for{' '}
          <span data-testid="confirmed-passengers">{passengerCount}</span>{' '}
          {passengerCount === 1 ? 'passenger' : 'passengers'}.
        </p>
        <p className="confirmed-total">
          Total charged:{' '}
          <strong data-testid="confirmed-total">${totalPrice}</strong>
        </p>
        <button
          className="btn btn-primary"
          onClick={resetBooking}
          data-testid="new-search-btn"
        >
          Book Another Flight
        </button>
      </div>
    );
  }

  return (
    <div className="booking-summary">
      <div className="summary-header">
        <h2>Booking Summary</h2>
        <button
          className="btn btn-secondary"
          onClick={goToResults}
          data-testid="back-to-results"
        >
          Back to Results
        </button>
      </div>

      <div className="summary-card">
        <div className="summary-flight">
          <h3>{selectedFlight.airline}</h3>
          <div className="summary-route">
            {selectedFlight.from} &rarr; {selectedFlight.to}
          </div>
          <div className="summary-times">
            <span>{selectedFlight.departure}</span>
            <span className="summary-duration">{selectedFlight.duration}</span>
            <span>{selectedFlight.arrival}</span>
          </div>
        </div>

        <div className="summary-passengers">
          <label>Passengers</label>
          <div className="passenger-control">
            <button
              className="btn btn-icon"
              onClick={() => setPassengerCount(Math.max(1, passengerCount - 1))}
              disabled={passengerCount <= 1}
              data-testid="decrease-passengers"
            >
              &minus;
            </button>
            <span className="passenger-count" data-testid="summary-passenger-count">
              {passengerCount}
            </span>
            <button
              className="btn btn-icon"
              onClick={() => setPassengerCount(Math.min(6, passengerCount + 1))}
              disabled={passengerCount >= 6}
              data-testid="increase-passengers"
            >
              +
            </button>
          </div>
        </div>

        <div className="summary-pricing">
          <div className="price-line">
            <span>
              ${selectedFlight.price} &times;{' '}
              <span data-testid="price-multiplier">{passengers}</span>{' '}
              {passengers === 1 ? 'passenger' : 'passengers'}
            </span>
            <span data-testid="total-price">${totalPrice}</span>
          </div>
        </div>
      </div>

      <button
        className="btn btn-primary btn-confirm"
        onClick={confirmBooking}
        data-testid="confirm-btn"
      >
        Confirm Booking
      </button>
    </div>
  );
}
