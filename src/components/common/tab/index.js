import React, { useState } from "react";

const Tabs = ({ activeTab, tabConfig, onTabChange }) => {

  return (
    <div className="tabs">
      {tabConfig.map((config) => (
        <button
          key={config.id}
          className={`tab btn-lg ${activeTab === config.id ? "active" : ""}`}
          onClick={() => onTabChange(config.id)}
        >
          {config.name}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
