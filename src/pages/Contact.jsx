import { useReducer } from "react";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  submitted: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "SUBMIT":
      return {
        ...state,
        submitted: true,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export default function Contact() {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !state.name ||
      !state.email ||
      !state.subject ||
      !state.message
    ) {
      alert("Please fill all fields.");
      return;
    }

    dispatch({ type: "SUBMIT" });
  };

  if (state.submitted) {
    return (
      <main className="page">
        <div className="success-card">
          <div className="success-icon">✓</div>

          <h1>Message received!</h1>

          <p>
            Thank you for contacting Nexora. Our team
            will get back to you soon.
          </p>

          <button
            className="primary-button"
            onClick={() =>
              dispatch({ type: "RESET" })
            }
          >
            Send another message
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="contact-layout">
        <div className="contact-info">
          <span className="eyebrow">GET IN TOUCH</span>

          <h1>Let's start a conversation.</h1>

          <p>
            Have a question, suggestion or just want to
            say hello? We'd love to hear from you.
          </p>

          <div className="contact-details">
            <div>
              <span>📧</span>
              <div>
                <strong>Email</strong>
                <p>hello@nexora.com</p>
              </div>
            </div>

            <div>
              <span>📞</span>
              <div>
                <strong>Phone</strong>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div>
              <span>📍</span>
              <div>
                <strong>Office</strong>
                <p>Bengaluru, India</p>
              </div>
            </div>
          </div>
        </div>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label>Your Name</label>
            <input
              value={state.name}
              onChange={(e) =>
                dispatch({
                  type: "CHANGE",
                  field: "name",
                  value: e.target.value,
                })
              }
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={state.email}
              onChange={(e) =>
                dispatch({
                  type: "CHANGE",
                  field: "email",
                  value: e.target.value,
                })
              }
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input
              value={state.subject}
              onChange={(e) =>
                dispatch({
                  type: "CHANGE",
                  field: "subject",
                  value: e.target.value,
                })
              }
              placeholder="How can we help?"
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              rows="6"
              value={state.message}
              onChange={(e) =>
                dispatch({
                  type: "CHANGE",
                  field: "message",
                  value: e.target.value,
                })
              }
              placeholder="Write your message..."
            />
          </div>

          <button className="primary-button">
            Send Message →
          </button>
        </form>
      </div>
    </main>
  );
}