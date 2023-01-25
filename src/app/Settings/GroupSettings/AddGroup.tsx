import React, { useState } from 'react';

import { MdAdd } from 'react-icons/md';
import AddGroupModal from './AddGroupModal';

const AddCompany = () => {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <>
      <div
        className="height-256 width-256 border-primary center-items primary pointer shadow-extra-light hover-background-primary hover-white"
        onClick={() => setModal(true)}
      >
        <div className="flex-column center-items">
          <MdAdd size={32} />
          <span className="margin-top-8">Add new</span>
        </div>
      </div>
      {modal && <AddGroupModal setModal={setModal} />}
    </>
  );
};

export default AddCompany;
