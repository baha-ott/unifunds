export default function UserProfileCard() {

    return   <div className="w-full md:w-3/12 md:mx-2">
    <div className="bg-white p-3 border-t-4 border-brand-primary">
      <div className="image overflow-hidden">
        <img
          className="h-auto w-full mx-auto"
          src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
          alt=""
        />
      </div>
      <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
        Jane Doe
      </h1>
      <h3 className="text-gray-600 font-lg text-semibold leading-6">
        Owner at Her Company Inc.
      </h3>
      <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur
        non deserunt
      </p>
      <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
        <li className="flex items-center py-3">
          <span>Status</span>
          <span className="ml-auto">
            <span className="bg-brand-primary py-1 px-2 rounded text-white text-sm">
              Active
            </span>
          </span>
        </li>
        <li className="flex items-center py-3">
          <span>Member since</span>
          <span className="ml-auto">Nov 07, 2016</span>
        </li>
      </ul>
    </div>

    <div className="my-4"></div>

    <div className="bg-white p-3 hover:shadow">
      <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
        <span className="text-brand-primary">
          <svg
            className="h-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </span>
        <span>Similar Profiles</span>
      </div>
      <div className="grid grid-cols-3">
        <div className="text-center my-2">
          <img
            className="h-16 w-16 rounded-full mx-auto"
            src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
            alt=""
          />
          <a href="#" className="text-main-color">
            Kojstantin
          </a>
        </div>
        <div className="text-center my-2">
          <img
            className="h-16 w-16 rounded-full mx-auto"
            src="https://avatars2.githubusercontent.com/u/24622175?s=60&amp;v=4"
            alt=""
          />
          <a href="#" className="text-main-color">
            James
          </a>
        </div>
        <div className="text-center my-2">
          <img
            className="h-16 w-16 rounded-full mx-auto"
            src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
            alt=""
          />
          <a href="#" className="text-main-color">
            Natie
          </a>
        </div>
        <div className="text-center my-2">
          <img
            className="h-16 w-16 rounded-full mx-auto"
            src="https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/f04b52da-12f2-449f-b90c-5e4d5e2b1469_361x361.png"
            alt=""
          />
          <a href="#" className="text-main-color">
            Casey
          </a>
        </div>
      </div>
    </div>
  </div>
}