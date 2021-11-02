import Link from 'next/link';
import { useRouter } from 'next/router';

const ListItems = ({ id, label, ImageComp, path }) => {
    const router = useRouter()

    return (
        <li
            key={id}
            className={router.asPath === path ? "active" : ""}
        >
            <Link href={path} passHref>
                <div className="list-item">
                    <ImageComp/>
                    <span>{label}</span>
                </div>
            </Link>
        </li>
    )
}

export default ListItems;