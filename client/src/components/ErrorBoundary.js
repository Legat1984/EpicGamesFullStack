import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#1a1a1a',
          color: '#ffffff',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Что-то пошло не так.</h1>
          <p style={{ marginBottom: '1rem' }}>Произошла ошибка при загрузке приложения.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Перезагрузить страницу
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details style={{ 
              width: '100%', 
              maxWidth: '800px', 
              marginTop: '20px',
              textAlign: 'left',
              backgroundColor: '#333',
              padding: '10px',
              borderRadius: '4px'
            }}>
              <summary style={{ cursor: 'pointer', marginBottom: '10px' }}>
                Подробности об ошибке
              </summary>
              <p><strong>Ошибка:</strong> {this.state.error && this.state.error.toString()}</p>
              <p><strong>Информация:</strong></p>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;