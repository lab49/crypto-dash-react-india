import { ArrowDownRight, ArrowUpRight } from 'react-bootstrap-icons';

export default function Header({ data }) {
    const { name, symbol, price, diff, percentage } = data;

    return (
        <header>
            <div className="h6">
                {symbol}
            </div>
            <div className="h3">
                {name}
            </div>
            <div className="h3">
                ${price ? parseFloat(price).toFixed(2) : ""}
            </div>
            <div className="h6">
                {
                    diff >= 0 ?
                        <ArrowUpRight className="text-success" size={16} /> :
                        <ArrowDownRight className="text-danger" size={16} />
                }
                <span className={`d-inline-block mx-2 ${diff < 0 ? "text-danger" : "text-success"}`}>
                    {`$${Math.abs(diff)} (${percentage}%)`}
                </span>
                <span className="d-inline-block">Today</span>
            </div>
        </header>
    )
}