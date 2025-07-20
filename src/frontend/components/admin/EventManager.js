import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt, FaMapMarkerAlt, FaUpload, FaTimes, FaImage } from 'react-icons/fa';

// Color constants
const COLORS = {
  primary: '#1E3A8A',
  secondary: '#3B82F6',
  accentYellow: '#FBBF24',
  accentGold: '#D4AF37',
  neutralDark: '#111827',
  neutralMid: '#374151',
  neutralLight: '#D1D5DB',
  white: '#FFFFFF',
  black: '#000000',
};

const ERROR = '#ff5555';
const SUCCESS = '#10B981';

// Sample locations for autocomplete
const LOCATIONS = [
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Philadelphia, PA',
  'San Antonio, TX',
  'San Diego, CA',
  'Dallas, TX',
  'San Jose, CA'
];

// Styled components
const Container = styled.div`
  padding: 2.5rem;
  background: ${COLORS.neutralDark};
  border: 1px solid ${COLORS.neutralMid};
  margin: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: ${COLORS.accentYellow};
  margin: 0 0 2rem 0;
  padding: 0 0 1rem 0;
  border-bottom: 1px solid ${COLORS.neutralMid};
`;

const ErrorMessage = styled.div`
  padding: 1.2rem;
  margin: 0 0 2rem 0;
  background: rgba(255,85,85,0.15);
  color: ${ERROR};
  border: 1px solid ${ERROR};
  font-weight: 500;
`;

const SuccessMessage = styled.div`
  padding: 1.2rem;
  margin: 0 0 2rem 0;
  background: rgba(16, 185, 129, 0.15);
  color: ${SUCCESS};
  border: 1px solid ${SUCCESS};
  font-weight: 500;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 0 0 2.5rem 0;
  align-items: flex-end;
`;

const InputGroup = styled.div`
  position: relative;
  margin: 0.5rem 0;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  color: ${COLORS.neutralLight};
  margin: 0 0 0.8rem 0.5rem;
`;

const Input = styled.input`
  padding: 1.1rem 1.3rem 1.1rem 3.2rem;
  background: ${COLORS.neutralMid};
  border: 1px solid ${COLORS.neutralLight};
  color: ${COLORS.white};
  font-size: 1rem;
  transition: all 0.3s;
  width: 100%;
  margin: 0.3rem 0;

  &:focus {
    outline: none;
    border-color: ${COLORS.secondary};
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }

  &::placeholder {
    color: ${COLORS.neutralLight};
    opacity: 0.7;
  }
`;

const IconWrapper = styled.span`
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${COLORS.neutralLight};
  font-size: 1.1rem;
`;

const StyledDatePicker = styled(DatePicker)`
  padding: 1.1rem 1.3rem 1.1rem 3.2rem;
  background: ${COLORS.neutralMid};
  border: 1px solid ${COLORS.neutralLight};
  color: ${COLORS.white};
  font-size: 1rem;
  width: 100%;
  margin: 0.3rem 0;
  
  &:focus {
    outline: none;
    border-color: ${COLORS.secondary};
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }
`;

const LocationDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.3rem);
  left: 0;
  right: 0;
  background: ${COLORS.neutralMid};
  border: 1px solid ${COLORS.neutralLight};
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
`;

const LocationOption = styled.div`
  padding: 0.9rem 1.3rem;
  cursor: pointer;
  color: ${COLORS.neutralLight};
  transition: all 0.2s;
  
  &:hover {
    background: ${COLORS.neutralDark};
    color: ${COLORS.white};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${COLORS.neutralDark};
  }
`;

const FileUploadContainer = styled.div`
  position: relative;
  margin: 1rem 0;
`;

const FileInput = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 1.5rem;
  background: ${COLORS.neutralMid};
  color: ${COLORS.neutralLight};
  cursor: pointer;
  transition: all 0.3s;
  border: 1px dashed ${COLORS.neutralLight};

  &:hover {
    background: ${COLORS.neutralDark};
    border-color: ${COLORS.secondary};
  }
`;

const PreviewContainer = styled.div`
  margin-top: 1rem;
  position: relative;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  border: 1px solid ${COLORS.neutralMid};
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(255, 85, 85, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: ${ERROR};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 0.8rem;
`;

const Button = styled.button`
  padding: 1.1rem 1.8rem;
  background: ${props => 
    props.variant === 'secondary' 
      ? COLORS.neutralMid 
      : props.variant === 'cancel'
        ? 'transparent'
        : props.variant === 'add'
          ? COLORS.accentGold
          : COLORS.primary};
  color: ${props => 
    props.variant === 'cancel' 
      ? COLORS.neutralLight 
      : COLORS.white};
  border: ${props => 
    props.variant === 'cancel' 
      ? `1px solid ${COLORS.neutralMid}` 
      : 'none'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: ${props => props.compact ? 'auto' : '120px'};
  border-radius: 0;
  
  &:hover {
    background: ${props => 
      props.variant === 'secondary' 
        ? COLORS.neutralLight 
        : props.variant === 'cancel'
          ? COLORS.neutralMid
          : props.variant === 'add'
            ? '#c1952b'
            : COLORS.secondary};
    color: ${props => 
      props.variant === 'cancel' 
        ? COLORS.white 
        : COLORS.white};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${props => props.compact && `
    padding: 0.9rem 1.2rem;
    min-width: 90px;
  `}
`;

const TableContainer = styled.div`
  margin: 2.5rem 0 1.5rem 0;
  overflow-x: auto;
  border: 1px solid ${COLORS.neutralMid};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: ${COLORS.primary};
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${COLORS.neutralMid};
  
  &:nth-child(even) {
    background: rgba(255,255,255,0.03);
  }
  
  &:hover {
    background: rgba(255,255,255,0.05);
  }
`;

const TableCell = styled.td`
  padding: 1.3rem;
  color: ${COLORS.neutralLight};
  border-right: 1px solid ${COLORS.neutralMid};
  vertical-align: middle;
  
  &:last-child {
    border-right: none;
  }
`;

const TableHeaderCell = styled.th`
  padding: 1.3rem;
  text-align: left;
  color: ${COLORS.white};
  font-weight: 600;
  border-right: 1px solid ${COLORS.neutralMid};
  
  &:last-child {
    border-right: none;
  }
`;

const ActionCell = styled(TableCell)`
  display: flex;
  gap: 0.8rem;
  padding: 1rem;
`;

const EmptyRow = styled.tr`
  td {
    padding: 3rem;
    text-align: center;
    color: ${COLORS.neutralLight};
    font-style: italic;
    font-size: 1.1rem;
  }
`;

const ImageThumbnail = styled.img`
  width: 80px;
  height: 60px;
  object-fit: cover;
  border: 1px solid ${COLORS.neutralMid};
`;

export default function EventManager({ apiBase, token }) {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ 
    id: null, 
    date: null, 
    title: '', 
    location: '' 
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });
  const [locationInput, setLocationInput] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState(LOCATIONS);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const res = await fetch(`${apiBase}/api/events`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to load events');
      const data = await res.json();
      setEvents(data);
      setStatus({ type: 'success', message: 'Events loaded successfully' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle form submit (create or update)
  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const formData = new FormData();
      formData.append('date', form.date ? form.date.toISOString() : '');
      formData.append('title', form.title);
      formData.append('location', form.location);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const method = form.id ? 'PUT' : 'POST';
      const url = form.id
        ? `${apiBase}/api/events/${form.id}`
        : `${apiBase}/api/events`;

      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!res.ok) {
        const errBody = await res.json();
        throw new Error(errBody.error || 'Save failed');
      }

      await fetchEvents();
      resetForm();
      setStatus({ type: 'success', message: form.id ? 'Event updated successfully!' : 'Event created successfully!' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({ id: null, date: null, title: '', location: '' });
    setLocationInput('');
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle delete
  const handleDelete = async id => {
    if (!window.confirm('Delete this event? This cannot be undone.')) return;
    try {
      const res = await fetch(`${apiBase}/api/events/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Delete failed');
      setEvents(events.filter(ev => ev.id !== id));
      setStatus({ type: 'success', message: 'Event deleted successfully!' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Populate form for editing
  const startEdit = ev => {
    setForm({ 
      id: ev.id, 
      date: ev.date ? new Date(ev.date) : null, 
      title: ev.title, 
      location: ev.location 
    });
    setLocationInput(ev.location);
    if (ev.image_url) {
      setImagePreview(`${apiBase}${ev.image_url}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle location input change
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocationInput(value);
    setForm({ ...form, location: value });
    
    if (value.length > 0) {
      setFilteredLocations(
        LOCATIONS.filter(loc => 
          loc.toLowerCase().includes(value.toLowerCase())
        )
      );
      setShowLocationDropdown(true);
    } else {
      setShowLocationDropdown(false);
    }
  };

  // Select location from dropdown
  const selectLocation = (location) => {
    setForm({ ...form, location });
    setLocationInput(location);
    setShowLocationDropdown(false);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Container>
      <Title>Manage Events</Title>
      
      {status.type === 'error' && <ErrorMessage>{status.message}</ErrorMessage>}
      {status.type === 'success' && <SuccessMessage>{status.message}</SuccessMessage>}

      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <InputGroup>
          <InputLabel>Event Date</InputLabel>
          <IconWrapper>
            <FaCalendarAlt />
          </IconWrapper>
          <StyledDatePicker
            selected={form.date}
            onChange={(date) => setForm({ ...form, date })}
            dateFormat="MMMM d, yyyy"
            placeholderText="Select a date"
            required
          />
        </InputGroup>
        
        <InputGroup>
          <InputLabel>Event Title</InputLabel>
          <Input
            type="text"
            placeholder="Event Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
          />
        </InputGroup>
        
        <InputGroup>
          <InputLabel>Location</InputLabel>
          <IconWrapper>
            <FaMapMarkerAlt />
          </IconWrapper>
          <Input
            type="text"
            placeholder="Event Location"
            value={locationInput}
            onChange={handleLocationChange}
            onFocus={() => locationInput && setShowLocationDropdown(true)}
            onBlur={() => setTimeout(() => setShowLocationDropdown(false), 200)}
            required
          />
          {showLocationDropdown && filteredLocations.length > 0 && (
            <LocationDropdown>
              {filteredLocations.map((location, index) => (
                <LocationOption 
                  key={index} 
                  onMouseDown={() => selectLocation(location)}
                >
                  {location}
                </LocationOption>
              ))}
            </LocationDropdown>
          )}
        </InputGroup>

        <FileUploadContainer>
          <InputLabel>Event Image/Flyer</InputLabel>
          <FileInput
            type="file"
            id="event-image"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          <UploadLabel htmlFor="event-image">
            <FaUpload /> {imagePreview ? 'Change Image' : 'Upload Image'}
          </UploadLabel>
          
          {imagePreview && (
            <PreviewContainer>
              <PreviewImage src={imagePreview} alt="Event preview" />
              <RemoveImageButton onClick={removeImage}>
                <FaTimes />
              </RemoveImageButton>
            </PreviewContainer>
          )}
        </FileUploadContainer>
        
        <ButtonGroup>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            variant={form.id ? 'primary' : 'add'}
          >
            {form.id ? 'UPDATE' : 'CREATE EVENT'}
          </Button>
          
          {form.id && (
            <Button 
              type="button"
              variant="cancel"
              onClick={resetForm}
            >
              CANCEL
            </Button>
          )}
        </ButtonGroup>
      </Form>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableHeaderCell>IMAGE</TableHeaderCell>
              <TableHeaderCell>DATE</TableHeaderCell>
              <TableHeaderCell>TITLE</TableHeaderCell>
              <TableHeaderCell>LOCATION</TableHeaderCell>
              <TableHeaderCell>ACTIONS</TableHeaderCell>
            </tr>
          </TableHeader>
          
          <tbody>
            {events.map(ev => (
              <TableRow key={ev.id}>
                <TableCell>
                  {ev.image_url ? (
                    <ImageThumbnail 
                      src={`${apiBase}${ev.image_url}`} 
                      alt="Event" 
                    />
                  ) : (
                    <FaImage size={24} color={COLORS.neutralLight} />
                  )}
                </TableCell>
                <TableCell>{formatDate(ev.date)}</TableCell>
                <TableCell>{ev.title}</TableCell>
                <TableCell>{ev.location}</TableCell>
                <ActionCell>
                  <Button 
                    variant="secondary" 
                    onClick={() => startEdit(ev)}
                    compact
                  >
                    EDIT
                  </Button>
                  <Button 
                    variant="cancel" 
                    onClick={() => handleDelete(ev.id)}
                    compact
                  >
                    DELETE
                  </Button>
                </ActionCell>
              </TableRow>
            ))}
            
            {events.length === 0 && (
              <EmptyRow>
                <TableCell colSpan="5">No events found. Create your first event above.</TableCell>
              </EmptyRow>
            )}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}