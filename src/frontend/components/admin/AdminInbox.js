import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const COLORS = {
  neutralDark:  '#111827',
  neutralMid:   '#374151',
  neutralLight: '#D1D5DB',
  accentYellow: '#FBBF24',
  accentGold:   '#D4AF37',
};
const SPACING    = { sm:'12px', md:'16px', lg:'24px', xl:'32px' };
const FONT_SIZES = { base:'1rem', lg:'1.5rem' };

const API_BASE = '/api/contact/messages';

const spin = keyframes`to { transform: rotate(360deg); }`;
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const AdminContainer = styled.div`
  background: ${COLORS.neutralDark};
  color: ${COLORS.neutralLight};
  min-height: 100vh;
  padding: ${SPACING.lg};
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.4s ease both;
`;

const Title = styled.h1`
  font-size: ${FONT_SIZES.lg};
  color: ${COLORS.accentGold};
  margin-bottom: ${SPACING.lg};
`;

const LoadingIndicator = styled.div`
  text-align: center;
  padding: ${SPACING.xl} 0;
  .spinner {
    width: 48px; height: 48px;
    border: 4px solid rgba(251,191,36,0.2);
    border-top-color: ${COLORS.accentYellow};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    margin: 0 auto ${SPACING.md};
  }
  p { color: ${COLORS.neutralLight}; }
`;

const EmptyState = styled.div`
  text-align: center;
  margin: ${SPACING.xl} auto;
  color: ${COLORS.neutralLight};
  font-size: ${FONT_SIZES.base};
`;

const MessagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px,1fr));
  gap: ${SPACING.lg};
  flex: 1;
`;

const MessageCard = styled.article`
  background: ${COLORS.neutralMid};
  border-radius: 8px;
  padding: ${SPACING.md};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  transition: transform 0.3s ease;
  &:hover { transform: translateY(-4px); }
`;

const MessageHeader = styled.div`
  margin-bottom: ${SPACING.sm};
  & > h2 { 
    font-size: ${FONT_SIZES.base}; 
    margin: 0; 
    color: ${COLORS.accentYellow}; 
  }
  & > time { 
    font-size: 0.875rem; 
    color: ${COLORS.neutralLight}; 
    opacity: 0.8; 
  }
`;

const MessageBody = styled.div`
  flex: 1;
  margin-bottom: ${SPACING.md};
  p { margin: 0 ${SPACING.sm} 0 0; color: ${COLORS.neutralLight}; }
`;

const MessageFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  background: ${COLORS.accentYellow};
  border: none;
  border-radius: 4px;
  color: ${COLORS.neutralDark};
  padding: 4px 8px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s ease;
  &:hover { background: ${COLORS.accentGold}; }
`;

export default function AdminInboxPage() {
  const [messages, setMessages] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    fetch(API_BASE)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setMessages)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async id => {
    if (!window.confirm('Delete this message?')) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Delete failed ${res.status}`);
      setMessages(ms => ms.filter(m => m.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete message');
    }
  };

  if (loading) return (
    <AdminContainer>
      <LoadingIndicator>
        <div className="spinner" />
        <p>Loading messages…</p>
      </LoadingIndicator>
    </AdminContainer>
  );
  if (error) return (
    <AdminContainer>
      <EmptyState>Error: {error}</EmptyState>
    </AdminContainer>
  );

  return (
    <AdminContainer>
      <Title>Admin Inbox</Title>
      {messages.length === 0
        ? <EmptyState>No messages found.</EmptyState>
        : (
          <MessagesGrid>
            {messages.map(msg => (
              <MessageCard key={msg.id}>
                <MessageHeader>
                  <h2>{msg.subject}</h2>
                  <time>{new Date(msg.created_at).toLocaleString()}</time>
                </MessageHeader>
                <MessageBody>
                  <p><strong>From:</strong> {msg.name} &lt;{msg.email}&gt;</p>
                  {msg.reason && <p><strong>Reason:</strong> {msg.reason}</p>}
                  <p>{msg.message}</p>
                </MessageBody>
                <MessageFooter>
                  <ActionButton onClick={() => handleDelete(msg.id)}>
                    Delete
                  </ActionButton>
                </MessageFooter>
              </MessageCard>
            ))}
          </MessagesGrid>
        )}
    </AdminContainer>
  );
}
