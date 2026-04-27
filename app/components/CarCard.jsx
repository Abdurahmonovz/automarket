import Image from "next/image";

export default function CarCard({ car }) {
    return (
        <div className="rounded-2xl bg-white p-4 shadow">
            <div className="relative h-40 w-full overflow-hidden rounded-xl bg-gray-200">
                <Image 
                src={car.img}
                alt={car.name}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw 33vw"
                />
            </div>
            <h2 className="mt-3 text-xl font-bold">{car.name}</h2>
            <p className="text-gray-600">{car.price}</p>

            <button className="mt-4 w-full rounded-xl bg-black py-2 text-white">
                Ko'rish
            </button>
        </div>
    )
}