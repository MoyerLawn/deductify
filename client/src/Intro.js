import React from "react";
import "./Intro.css"; // Import the CSS file for styling

const Intro = () => {
  return (
    <div className="deductify-info">
      <h1 className="header">Welcome to Deductify</h1>
      <p>
        <strong>Deductify</strong> is a powerful application designed
        specifically for business owners and contractors who want to effectively
        manage and track their tax-advantaged transactions. In today's
        fast-paced financial landscape, understanding and optimizing your
        expenses is crucial for maximizing your tax benefits.
      </p>
      <h2 className="header">What is Deductify?</h2>
      <p>
        Deductify leverages the innovative <a href="https://pinata.cloud/blog/announcing-the-new-pinata-ipfs-sdk/" target="_blank">Pinata IPFS Web 3</a> platform to
        securely store and manage your financial data. With our user-friendly
        interface, you can easily log, categorize, and track your transactions,
        ensuring you never miss out on valuable deductions when tax season
        arrives.
      </p>
      <h2 className="header">Key Features</h2>
      <ul className="features-list">
        <li>
          <strong>Tax-Advantaged Tracking:</strong> Stay organized by keeping
          track of all your tax-deductible transactions, helping you maximize
          your savings.
        </li>
        <li>
          <strong>Secure Storage:</strong> Using the <a href="https://pinata.cloud/blog/announcing-the-new-pinata-ipfs-sdk/" target="_blank">Pinata IPFS Web 3</a> platform,
          your data is securely stored and easily accessible whenever you need
          it.
        </li>
        <li>
          <strong>User-Friendly Interface:</strong> Our intuitive design makes
          it easy for you to log and manage your transactions, no matter your
          technical expertise.
        </li>
        <li>
          <strong>Real-Time Insights:</strong> Gain insights into your spending
          patterns and potential deductions, enabling you to make informed
          financial decisions.
        </li>
        <li>
          <strong>OCR AI Text Recognition:</strong> We're implementing advanced
          OCR (Optical Character Recognition) technology using Tesseract,
          allowing you to effortlessly scan and digitize receipts and documents.
          This feature streamlines the process of logging transactions, making
          it easier than ever to keep track of your finances.
        </li>
      </ul>
      <h2 className="header">Who Can Benefit?</h2>
      <p>Deductify is ideal for:</p>
      <ul className="benefits-list">
        <li>
          <strong>Business Owners:</strong> Whether you run a small business or
          a larger enterprise, Deductify simplifies your financial management
          and helps you keep track of your deductible expenses.
        </li>
        <li>
          <strong>Contractors:</strong> Independent contractors can benefit from
          the ability to manage various transactions seamlessly, ensuring
          accurate reporting and compliance.
        </li>
      </ul>
      <h2 className="header">Start Maximizing Your Deductions Today!</h2>
      <p>
        Join us in transforming the way you manage your tax-advantaged
        transactions. With Deductify, you’ll be empowered to take control of
        your finances and maximize your savings.
      </p>
    </div>
  );
};

export default Intro;
