import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, Smartphone, ChevronRight } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const DEVICES: Record<string, string[]> = {
  Apple: [
    "iPhone 16 Pro Max",
    "iPhone 16 Pro",
    "iPhone 16 Plus",
    "iPhone 16",
    "iPhone 15 Pro Max",
    "iPhone 15 Pro",
    "iPhone 15 Plus",
    "iPhone 15",
    "iPhone 14 Pro Max",
    "iPhone 14 Pro",
    "iPhone 14 Plus",
    "iPhone 14",
    "iPhone 13 Pro Max",
    "iPhone 13 Pro",
    "iPhone 13",
    "iPhone 13 Mini",
    "iPhone 12 Pro Max",
    "iPhone 12 Pro",
    "iPhone 12",
    "iPhone 12 Mini",
    "iPhone SE (3rd Gen)",
  ],
  Samsung: [
    "Galaxy S25 Ultra",
    "Galaxy S25+",
    "Galaxy S25",
    "Galaxy S24 Ultra",
    "Galaxy S24+",
    "Galaxy S24",
    "Galaxy S23 Ultra",
    "Galaxy S23+",
    "Galaxy S23",
    "Galaxy Z Fold 6",
    "Galaxy Z Flip 6",
    "Galaxy Z Fold 5",
    "Galaxy Z Flip 5",
    "Galaxy A55",
    "Galaxy A35",
  ],
  Google: [
    "Pixel 9 Pro XL",
    "Pixel 9 Pro",
    "Pixel 9",
    "Pixel 8 Pro",
    "Pixel 8",
    "Pixel 7 Pro",
    "Pixel 7",
    "Pixel 7a",
    "Pixel 6 Pro",
    "Pixel 6",
    "Pixel 6a",
  ],
  OnePlus: [
    "OnePlus 13",
    "OnePlus 12",
    "OnePlus 11",
    "OnePlus Open",
    "OnePlus Nord 4",
    "OnePlus Nord CE 4",
  ],
};

const BRANDS = Object.keys(DEVICES);

export function DeviceModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { deviceModel, setDeviceModel } = useAppContext();

  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    deviceModel?.brand ?? null
  );
  const [selectedModel, setSelectedModel] = useState<string | null>(
    deviceModel?.model ?? null
  );
  const [step, setStep] = useState<"brand" | "model">(
    deviceModel ? "model" : "brand"
  );

  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setStep("model");
  };

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
  };

  const handleConfirm = () => {
    if (selectedBrand && selectedModel) {
      setDeviceModel({ brand: selectedBrand, model: selectedModel });
      onClose();
    }
  };

  const handleClose = () => {
    // Reset to saved state if user dismisses without confirming
    setSelectedBrand(deviceModel?.brand ?? null);
    setSelectedModel(deviceModel?.model ?? null);
    setStep(deviceModel ? "model" : "brand");
    onClose();
  };

  const modelsForBrand = selectedBrand ? DEVICES[selectedBrand] : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-auto md:left-1/2 md:-translate-x-1/2 md:w-[520px] max-h-[85vh] z-[90] flex flex-col rounded-3xl shadow-2xl overflow-hidden border border-[color:var(--text-primary)]/10"
            style={{ backgroundColor: "var(--bg-card)" }}
            role="dialog"
            aria-modal="true"
            aria-label="Select your device"
          >
            {/* Header */}
            <div
              className="flex justify-between items-center px-6 py-5 border-b border-[color:var(--text-primary)]/10 shrink-0"
            >
              <div className="flex items-center gap-3">
                <Smartphone
                  size={20}
                  className="text-[color:var(--accent)]"
                />
                <div>
                  <h2 className="font-syne font-bold text-lg text-[color:var(--text-primary)] uppercase tracking-wider">
                    {step === "brand" ? "Select Brand" : "Select Model"}
                  </h2>
                  {step === "model" && selectedBrand && (
                    <button
                      onClick={() => setStep("brand")}
                      className="text-xs font-space text-[color:var(--accent)] hover:underline"
                    >
                      Change brand
                    </button>
                  )}
                </div>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close device selector"
                className="p-2 rounded-full hover:bg-[color:var(--text-primary)]/5 transition-colors text-[color:var(--text-primary)]"
              >
                <X size={22} />
              </button>
            </div>

            {/* Current device banner */}
            {deviceModel && (
              <div className="px-6 py-3 bg-[color:var(--accent)]/10 border-b border-[color:var(--text-primary)]/5 shrink-0">
                <p className="text-xs font-space text-[color:var(--text-primary)] opacity-70">
                  Current:{" "}
                  <span className="font-bold text-[color:var(--accent)]">
                    {deviceModel.brand} {deviceModel.model}
                  </span>
                </p>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <AnimatePresence mode="wait">
                {step === "brand" ? (
                  <motion.div
                    key="brand-step"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-2 gap-3"
                  >
                    {BRANDS.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => handleBrandSelect(brand)}
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left group ${
                          selectedBrand === brand
                            ? "border-[color:var(--accent)] bg-[color:var(--accent)]/5"
                            : "border-[color:var(--text-primary)]/10 hover:border-[color:var(--accent)]/50 hover:bg-[color:var(--text-primary)]/3"
                        }`}
                      >
                        <span className="font-syne font-bold text-[color:var(--text-primary)]">
                          {brand}
                        </span>
                        <ChevronRight
                          size={16}
                          className="text-[color:var(--text-primary)] opacity-40 group-hover:opacity-100 transition-opacity"
                        />
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="model-step"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-2"
                  >
                    {modelsForBrand.map((model) => (
                      <button
                        key={model}
                        onClick={() => handleModelSelect(model)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left group ${
                          selectedModel === model
                            ? "border-[color:var(--accent)] bg-[color:var(--accent)]/5"
                            : "border-[color:var(--text-primary)]/10 hover:border-[color:var(--accent)]/50 hover:bg-[color:var(--text-primary)]/3"
                        }`}
                      >
                        <span className="font-space text-sm text-[color:var(--text-primary)]">
                          {model}
                        </span>
                        {selectedModel === model && (
                          <Check
                            size={16}
                            className="text-[color:var(--accent)] shrink-0"
                          />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {step === "model" && (
              <div className="p-4 border-t border-[color:var(--text-primary)]/10 shrink-0">
                <button
                  onClick={handleConfirm}
                  disabled={!selectedModel}
                  className={`w-full py-4 rounded-full font-syne font-bold uppercase tracking-widest transition-all ${
                    selectedModel
                      ? "bg-[color:var(--accent)] text-[color:var(--text-on-accent)] hover:opacity-90 active:scale-95"
                      : "bg-[color:var(--text-primary)]/10 text-[color:var(--text-primary)]/40 cursor-not-allowed"
                  }`}
                >
                  {selectedModel ? `Confirm — ${selectedModel}` : "Select a model"}
                </button>
                {deviceModel && (
                  <button
                    onClick={() => {
                      setDeviceModel(null);
                      onClose();
                    }}
                    className="w-full mt-2 py-2 text-xs font-space text-[color:var(--text-primary)] opacity-50 hover:opacity-80 transition-opacity"
                  >
                    Clear device preference
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
