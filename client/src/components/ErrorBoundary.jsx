import React from "react";

/* Catches render crashes so a bad page shows a message instead of a blank screen
   (and the custom cursor / navbar stay mounted). */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="error-boundary" role="alert">
          <h2>Something went wrong on this page</h2>
          <p>{String(this.state.error.message || this.state.error)}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
