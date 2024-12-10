'use client';

import Modal from '@/components/Modal';
import TodayCropModal from '@/components/TodayCropModal';
import { useCropContext } from '../context/modalContext';
// import { useCropContext } from '../\bcontext/modalContext';

export default function TodayCrop() {
  const { cropName } = useCropContext();

  return (
    <Modal>
      <TodayCropModal cropName={cropName} />
    </Modal>
  );
}
