import React from "react";
import { DashTitle, Button } from "../../components";
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";


function Category() {
  return (
    <main>
      <section className='flex items-center justify-between'>
        <DashTitle
          main='Study Goal Category'
          subtitle='Personalize your study goals in categories'
        />
        <div className="flex items-center">
          <Link to='../goals'>
            <FaArrowAltCircleLeft className=" mr-4 text-xl" />
          </Link>
          <Button text='New Category' background='black' />
        </div>
      </section>
    </main>
  );
}

export default Category;
