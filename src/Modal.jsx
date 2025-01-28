/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isVisible = false, onClose, prize, description }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#A70706] rounded-2xl shadow-lg p-6 w-[90%] max-w-md text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-bold text-[#FEF9C6] mb-8">{prize}</h2>
            <p className="text-md text-[#FEF9C6] mb-8">
              <span className="font-bold text-[#FEF9C6]">{description}</span>
            </p>
            <button
              onClick={onClose}
              className="bg-[#CD1928] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#A70706] transition"
            >
              Đóng
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
