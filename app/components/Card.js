import Link from 'next/link'

export default function Card({ id, image, name, species, gender, status }) {
    return (
        <div className="flex flex-col w-44 items-center justify-center">
            <Link href={`/personagem/${id}`}><img src={image} alt={name}></img></Link>
            <span className="text-sm font-bold">{name}</span>
            <span>Species: {species}</span>
            <span>Gender: {gender}</span>
            <span>Status: {status}</span>
        </div>
    );
}