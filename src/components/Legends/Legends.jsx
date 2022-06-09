import React from 'react'
import "./Legends.scss"

export default function Legends({ data }) {

    return (
        <div className="legends__container">
            {data.map((legend, i) =>
                <div className="legend__item" key={i}>
                    <div className="legend__color" style={{ background: `${legend.color}` }}></div>
                    <div className="legend__label">{legend.label}</div>
                </div>
            )}
        </div>
    )
}
