import React, { useState } from "react";

const Tabs = ({ activeTab, tabConfig, onTabClick }) => {

  return (
    <div className="tabs">
      {tabConfig.map((config) => (
        <button
          key={config.id}
          className={`tab btn-lg ${activeTab === config.id ? "active" : ""}`}
          onClick={() => onTabClick(config.id)}
        >
          {config.name}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
