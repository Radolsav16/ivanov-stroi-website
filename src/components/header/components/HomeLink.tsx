import { Link } from "react-router-dom"

const label = ['Ivanov','Stroi']

export default function HomeLink(){

  return (
       <div className="flex lg:flex-1">
          <Link to="/" className="group -m-1.5 flex items-center gap-3 p-1.5">
            <span className="text-2xl font-extrabold tracking-[0.04em] transition-transform duration-300 group-hover:scale-[1.03] sm:block">
              <span className="text-amber-500 transition-colors duration-300 group-hover:text-amber-400">
                {label[0]}
              </span>
              <span className="text-white transition-colors duration-300 group-hover:text-amber-500">
                {label[1]}
              </span>
            </span>
          </Link>
        </div>
  );
}
