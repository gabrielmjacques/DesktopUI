import './app-item.scss';

function AppItem({ icon, name }) {
    return (
        <div className="app-item">
            {icon}

            <span>{name}</span>
        </div>
    );
}

export default AppItem;