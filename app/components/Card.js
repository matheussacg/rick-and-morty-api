export default function Card({ image, name, species, gender, status }) {
    return (
        <div className="flex flex-col w-44 items-center justify-center">
            <img src={image} alt={name}></img>
            <span className="text-sm font-bold">{name}</span>
            <span>Species: {species}</span>
            <span>Gender: {gender}</span>
            <span>Status: {status}</span>
        </div>
    );
}