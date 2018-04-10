import React from 'react';

const Form = ({handleSubmit, handleChange, data}) => {
  return(
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="username">Username</label>
        <input className="input"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          value={data.username}
        />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          className="input"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={data.email}
        />
      </div>

      <div className="field">
        <label className="label">Birthday</label>
        <input
          onChange={handleChange}
          name="birthday"
          className="input"
          type="date"
        />
      </div>
      <button className="button is-primary">Submit</button>
    </form>
  );
};

export default Form;
