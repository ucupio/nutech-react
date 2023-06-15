import { ReactNode } from 'react';
import { HiXCircle } from 'react-icons/hi';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  withNoClose?: boolean;
}
export default function Modal({
  onClose,
  children,
  withNoClose = false,
}: ModalProps) {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/30 flex items-center justify-center z-50">
      <div className="w-8/12 bg-white rounded relative">
        <div className="absolute right-0 top-0 p-1">
          {!withNoClose && (
            <HiXCircle size={32} onClick={onClose} className="cursor-pointer" />
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
