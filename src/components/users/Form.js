import React from 'react';

const Form = ({handleSubmit, handleChange, data}) => {
  return(
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="username">
          <input
            name="username"
            onChange={handleChange}
            value={data.username}
          />
          <div className="input-text">Username</div>
          {data.errors.username && <small>{data.errors.username}</small>}
        </label>
      </div>
      <div className="field">
        <label htmlFor="email">
          <input
            name="email"
            onChange={handleChange}
            value={data.email}
          />
          <div className="input-text">Email</div>
          {data.errors.email && <small>{data.errors.email}</small>}
        </label>
      </div>

      <div className="field">
        <label className="label">
          <input
            onChange={handleChange}
            name="birthday"
            type="date"
          />
          <div className="input-text">Birthday</div>
          <small>We use your birthday to calculate the eras when you create a playlist! </small>
          {data.errors.birthday && <small>{data.errors.birthday}</small>}
        </label>
      </div>
      <div className="buttons">
        <button className="button">Submit</button>
      </div>
    </form>
  );
};

export default Form;
