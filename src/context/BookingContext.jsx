import { createContext, useContext, useState, useCallback } from 'react';

const BookingContext = createContext(null);

const MOCK_FLIGHTS = [
  { id: 1, airline: 'SkyWay Airlines', from: '', to: '', departure: '08:00 AM', arrival: '11:30 AM', duration: '3h 30m', price: 199 },
  { id: 2, airline: 'CloudJet', from: '', to: '', departure: '10:15 AM', arrival: '01:45 PM', duration: '3h 30m', price: 249 },
  { id: 3, airline: 'AeroVista', from: '', to: '', departure: '02:00 PM', arrival: '05:30 PM', duration: '3h 30m', price: 179 },
  { id: 4, airline: 'SwiftAir', from: '', to: '', departure: '06:30 PM', arrival: '10:00 PM', duration: '3h 30m', price: 299 },
];

export function BookingProvider({ children }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [passengerCount, setPassengerCount] = useState(1);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [flights, setFlights] = useState([]);
  const [step, setStep] = useState('search');
  const [confirmed, setConfirmed] = useState(false);

  const searchFlights = useCallback(() => {
    const results = MOCK_FLIGHTS.map((f) => ({
      ...f,
      from: origin,
      to: destination,
    }));
    setFlights(results);
    setStep('results');
  }, [origin, destination]);

  const selectFlight = useCallback((flight) => {
    setSelectedFlight(flight);
    setStep('summary');
  }, []);

  const confirmBooking = useCallback(() => {
    setConfirmed(true);
  }, []);

  const resetBooking = useCallback(() => {
    setSelectedFlight(null);
    setFlights([]);
    setStep('search');
    setConfirmed(false);
    setPassengerCount(1);
  }, []);

  const goToResults = useCallback(() => {
    setSelectedFlight(null);
    setStep('results');
    setConfirmed(false);
  }, []);

  return (
    <BookingContext.Provider
      value={{
        origin,
        setOrigin,
        destination,
        setDestination,
        date,
        setDate,
        passengerCount,
        setPassengerCount,
        selectedFlight,
        flights,
        step,
        confirmed,
        searchFlights,
        selectFlight,
        confirmBooking,
        resetBooking,
        goToResults,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
