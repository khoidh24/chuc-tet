/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isVisible = false, onClose, prize, description }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute inset-0 bg-black/50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="flex flex-col w-full max-w-md mx-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="bg-[#A70706] rounded-2xl shadow-lg p-6 w-full text-center">
              <h2 className="text-2xl font-bold text-[#FEF9C6] mb-6">
                {prize}
              </h2>
              <p className="text-ld text-[#FEF9C6] mb-4">
                <span className="font-bold text-[#FEF9C6]">{description}</span>
              </p>
            </div>
            <div className="flex justify-center items-center -mt-4">
              <button
                onClick={onClose}
                className="bg-[#CD1928] text-white px-8 py-2 rounded-lg font-semibold"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
