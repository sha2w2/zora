import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { AlertTriangle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

import applePayIcon from "../../imports/image.png";
import googlePayIcon from "../../imports/image-1.png";
import paypalIcon from "../../imports/image-2.png";
import visaIcon from "../../imports/image-3.png";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useAppContext();
  
  useEffect(() => {
    try {
      const savedForm = sessionStorage.getItem("zora-checkout-form");
      if (savedForm) {
        const parsed = JSON.parse(savedForm);
        if (parsed.fullName) setFullName(parsed.fullName);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.address1) setAddress1(parsed.address1);
        if (parsed.address2) setAddress2(parsed.address2);
        if (parsed.city) setCity(parsed.city);
        if (parsed.postcode) setPostcode(parsed.postcode);
        if (parsed.country) setCountry(parsed.country);
        if (parsed.paymentMethod) setPaymentMethod(parsed.paymentMethod);
      } else {
        const userStr = localStorage.getItem("zora-current-user");
        if (userStr) {
          const user = JSON.parse(userStr);
          setFullName(`${user.firstName || ""} ${user.lastName || ""}`.trim());
          setEmail(user.email || "");
        }
      }
    } catch (e) {}
  }, []);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("UK");
  
  const [paymentMethod, setPaymentMethod] = useState("visa");

  useEffect(() => {
    const formData = { fullName, email, phone, address1, address2, city, postcode, country, paymentMethod };
    sessionStorage.setItem("zora-checkout-form", JSON.stringify(formData));
  }, [fullName, email, phone, address1, address2, city, postcode, country, paymentMethod]);

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [paypalEmail, setPayPalEmail] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const delivery = total > 40 ? 0 : 5.99;
  const grandTotal = total + delivery;

  const luhnCheck = (val: string) => {
    let sum = 0;
    let shouldDouble = false;
    for (let i = val.length - 1; i >= 0; i--) {
      let digit = parseInt(val.charAt(i));
      if (shouldDouble) {
        if ((digit *= 2) > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return (sum % 10) == 0;
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!fullName) newErrors.fullName = "Full name is required.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Please enter a valid email address.";
    
    if (!phone) {
      newErrors.phone = "Phone number is required.";
    } else {
      if (country === "UK" && !/^(\+44\s?7\d{3}\s?\d{6}$)|(0\d{10})$/.test(phone)) {
        newErrors.phone = "Please enter a valid UK phone number (e.g., +44 7911 123456).";
      } else if (country === "LT" && !/^\+370\s?6\d{2}\s?\d{5}$/.test(phone)) {
        newErrors.phone = "Please enter a valid Lithuanian phone number (e.g., +370 612 34567).";
      } else if (country === "ZW" && !/^\+263\s?7\d{2}\s?\d{6}$/.test(phone)) {
        newErrors.phone = "Please enter a valid Zimbabwean phone number (e.g., +263 77 123 4567).";
      }
    }

    if (!address1) newErrors.address1 = "Address Line 1 is required.";
    if (!city) newErrors.city = "City is required.";
    if (!postcode || !/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i.test(postcode)) newErrors.postcode = "Postcode must be in the correct format (e.g., SW1A 1AA).";

    if (paymentMethod === "visa") {
      const cleanCard = cardNumber.replace(/\s+/g, '');
      if (cleanCard.length < 13 || !luhnCheck(cleanCard)) newErrors.cardNumber = "Card number is invalid \u2013 please check the digits.";
      if (!expiry || !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiry)) newErrors.expiry = "Expiry date must be in MM/YY format and not in the past.";
      else {
        const [mm, yy] = expiry.split('/');
        if (mm && yy) {
          const expiryDate = new Date(2000 + parseInt(yy), parseInt(mm) - 1);
          if (expiryDate < new Date()) newErrors.expiry = "Expiry date must be in MM/YY format and not in the past.";
        }
      }
      if (!cvv || !/^\d{3}$/.test(cvv)) newErrors.cvv = "CVV must be exactly 3 digits.";
    }

    if (paymentMethod === "paypal") {
      if (!paypalEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypalEmail)) newErrors.paypalEmail = "Please enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      validate();
    }
  }, [fullName, email, phone, address1, city, postcode, country, cardNumber, expiry, cvv, paypalEmail, paymentMethod]);

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    let formatted = "";
    for (let i = 0; i < val.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += " ";
      formatted += val[i];
    }
    setCardNumber(formatted.substring(0, 19));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length >= 2) {
      val = val.substring(0, 2) + "/" + val.substring(2, 4);
    }
    setExpiry(val);
  };

  const processPayment = () => {
    if (!validate()) {
      const allFields = ["fullName", "email", "phone", "address1", "city", "postcode", "cardNumber", "expiry", "cvv", "paypalEmail"];
      const newTouched: Record<string, boolean> = {};
      allFields.forEach(f => newTouched[f] = true);
      setTouched(newTouched);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const orderNumber = `ZORA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      toast.success(`${paymentMethod === 'apple-pay' ? 'Apple Pay' : paymentMethod === 'google-pay' ? 'Google Pay' : paymentMethod === 'paypal' ? 'PayPal' : 'Credit Card'} payment simulated \u2013 order placed!`);
      clearCart();
      navigate(`/order-confirmation?order=${orderNumber}`);
    }, 1500);
  };

  const handleAppleGooglePay = (method: string) => {
    setPaymentMethod(method);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const orderNumber = `ZORA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      toast.success(`${method === 'apple-pay' ? 'Apple Pay' : 'Google Pay'} payment simulated \u2013 order placed!`);
      clearCart();
      navigate(`/order-confirmation?order=${orderNumber}`);
    }, 1500);
  };

  const activeErrors = Object.entries(errors).filter(([key]) => touched[key]);
  
  // Format the error summary specific descriptions
  const getSummaryMessage = () => {
    const messages = activeErrors.map(([key, msg]) => {
      if (key === 'fullName') return 'full name missing';
      if (key === 'email') return 'invalid email address';
      if (key === 'phone') return 'phone number incorrect or missing';
      if (key === 'address1') return 'address missing';
      if (key === 'city') return 'city missing';
      if (key === 'postcode') return 'postcode format incorrect';
      if (key === 'cardNumber') return 'card number invalid';
      if (key === 'expiry') return 'expiry date incorrect';
      if (key === 'cvv') return 'CVV invalid';
      if (key === 'paypalEmail') return 'invalid PayPal email';
      return 'invalid input';
    });
    
    if (messages.length === 0) return null;
    return `The highlighted fields need attention: ${messages.join(", ")}.`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-syne text-[color:var(--text-primary)] mb-8 text-center">Checkout</h1>
      
      {activeErrors.length > 0 && (
        <div className="mb-8 p-4 bg-[color:var(--error)] bg-opacity-10 border border-[color:var(--error, #FF4444)] border-red-500 rounded-xl text-red-500 flex items-start gap-3">
          <AlertTriangle size={24} className="flex-shrink-0 mt-0.5" />
          <p className="font-space font-bold">{getSummaryMessage()}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-10">
          <section>
            <h2 className="text-2xl font-syne text-[color:var(--text-primary)] mb-6">Delivery Address</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[color:var(--text-primary)] mb-2">
                    Full Name <span className="text-[color:var(--error,#FF4444)] ml-[2px]">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    onBlur={() => handleBlur("fullName")}
                    className={`w-full bg-[color:var(--bg-card)] border ${touched.fullName && errors.fullName ? 'border-red-500' : (touched.fullName && !errors.fullName ? 'border-green-500' : 'border-[color:var(--bg-primary)]')} rounded-lg px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]`} 
                  />
                  {touched.fullName && errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-[color:var(--text-primary)] mb-2">
                    Email <span className="text-[color:var(--error,#FF4444)] ml-[2px]">*</span>
                  </label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onBlur={() => handleBlur("email")}
                    className={`w-full bg-[color:var(--bg-card)] border ${touched.email && errors.email ? 'border-red-500' : (touched.email && !errors.email ? 'border-green-500' : 'border-[color:var(--bg-primary)]')} rounded-lg px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]`} 
                  />
                  {touched.email && errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-[color:var(--text-primary)] mb-2">
                  Phone <span className="text-[color:var(--error,#FF4444)] ml-[2px]">*</span>
                </label>
                <input 
                  type="tel" 
                  placeholder={country === 'UK' ? "+44 7911 123456" : country === 'LT' ? "+370 612 34567" : "+263 77 123 4567"}
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  className={`w-full bg-[color:var(--bg-card)] border ${touched.phone && errors.phone ? 'border-red-500' : (touched.phone && !errors.phone ? 'border-green-500' : 'border-[color:var(--bg-primary)]')} rounded-lg px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]`} 
                />
                {touched.phone && errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-[color:var(--text-primary)] mb-2">
                  Address Line 1 <span className="text-[color:var(--error,#FF4444)] ml-[2px]">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="e.g., 123 Oxford Street"
                  value={address1}
                  onChange={e => setAddress1(e.target.value)}
                  onBlur={() => handleBlur("address1")}
                  className={`w-full bg-[color:var(--bg-card)] border ${touched.address1 && errors.address1 ? 'border-red-500' : (touched.address1 && !errors.address1 ? 'border-green-500' : 'border-[color:var(--bg-primary)]')} rounded-lg px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]`} 
                />
                {touched.address1 && errors.address1 && <p className="text-red-500 text-xs mt-1">{errors.address1}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-[color:var(--text-primary)] mb-2">Address Line 2 (Optional)</label>
                <input 
                  type="text" 
                  value={address2}
                  onChange={e => setAddress2(e.target.value)}
                  className="w-full bg-[color:var(--bg-card)] border border-[color:var(--bg-primary)] rounded-lg px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[color:var(--text-primary)] mb-2">
                    City <span className="text-[color:var(--error,#FF4444)] ml-[2px]">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g., London"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    onBlur={() => handleBlur("city")}
                    className={`w-full bg-[color:var(--bg-card)] border ${touched.city && errors.city ? 'border-red-500' : (touched.city && !errors.city ? 'border-green-500' : 'border-[color:var(--bg-primary)]')} rounded-lg px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]`} 
                  />
                  {touched.city && errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-[color:var(--text-primary)] mb-2">
                    Postcode <span className="text-[color:var(--error,#FF4444)] ml-[2px]">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g., SW1A 1AA"
                    value={postcode}
                    onChange={e => setPostcode(e.target.value)}
                    onBlur={() => handleBlur("postcode")}
                    className={`w-full bg-[color:var(--bg-card)] border ${touched.postcode && errors.postcode ? 'border-red-500' : (touched.postcode && !errors.postcode ? 'border-green-500' : 'border-[color:var(--bg-primary)]')} rounded-lg px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]`} 
                  />
                  {touched.postcode && errors.postcode && <p className="text-red-500 text-xs mt-1">{errors.postcode}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[color:var(--text-primary)] mb-2">
                  Country <span className="text-[color:var(--error,#FF4444)] ml-[2px]">*</span>
                </label>
                <div className="relative">
                  <select 
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className="w-full bg-[color:var(--bg-card)] border border-[color:var(--bg-primary)] rounded-lg px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] appearance-none"
                  >
                    <option value="UK">United Kingdom</option>
                    <option value="LT">Lithuania</option>
                    <option value="ZW">Zimbabwe</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--text-primary)] pointer-events-none" size={20} />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-syne text-[color:var(--text-primary)] mb-6">Payment Method</h2>
            <div className="space-y-4">
              
              <button 
                type="button"
                onClick={() => handleAppleGooglePay('apple-pay')}
                disabled={isProcessing}
                className="w-full flex items-center justify-center p-4 rounded-xl border border-[color:var(--text-primary)] hover:bg-[color:var(--text-primary)] hover:text-[color:var(--bg-primary)] transition-colors group"
              >
                {isProcessing && paymentMethod === 'apple-pay' ? (
                  <span className="font-bold flex items-center gap-2"><span className="animate-spin inline-block border-2 border-current border-t-transparent rounded-full w-5 h-5"></span> Processing...</span>
                ) : (
                  <span className="font-bold flex items-center gap-2">
                    Pay with
                    <img src={applePayIcon} alt="Apple Pay" className="h-8 w-auto object-contain" />
                  </span>
                )}
              </button>

              <button 
                type="button"
                onClick={() => handleAppleGooglePay('google-pay')}
                disabled={isProcessing}
                className="w-full flex items-center justify-center p-4 rounded-xl border border-[color:var(--text-primary)] hover:bg-[color:var(--text-primary)] hover:text-[color:var(--bg-primary)] transition-colors group"
              >
                {isProcessing && paymentMethod === 'google-pay' ? (
                  <span className="font-bold flex items-center gap-2"><span className="animate-spin inline-block border-2 border-current border-t-transparent rounded-full w-5 h-5"></span> Processing...</span>
                ) : (
                  <span className="font-bold flex items-center gap-2">
                    Pay with
                    <img src={googlePayIcon} alt="Google Pay" className="h-8 w-auto object-contain" />
                  </span>
                )}
              </button>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-[color:var(--bg-primary)] border-opacity-30"></div>
                <span className="flex-shrink-0 mx-4 text-[color:var(--text-primary)] opacity-50 text-sm font-space">OR</span>
                <div className="flex-grow border-t border-[color:var(--bg-primary)] border-opacity-30"></div>
              </div>

              <div className={`border rounded-xl transition-colors ${paymentMethod === 'visa' ? 'border-[color:var(--accent)] bg-[color:var(--accent)]/5' : 'border-[color:var(--bg-primary)]'}`}>
                <label className="flex items-center p-4 cursor-pointer">
                  <input type="radio" name="payment" value="visa" checked={paymentMethod === 'visa'} onChange={() => setPaymentMethod('visa')} className="accent-[color:var(--accent)] w-5 h-5" />
                  <span className="ml-4 font-bold text-[color:var(--text-primary)] flex-1">Visa / Credit Card</span>
                  <img src={visaIcon} alt="Visa" className="h-6 w-auto object-contain" />
                </label>
                
                <AnimatePresence>
                  {paymentMethod === 'visa' && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="p-4 pt-0 space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-[color:var(--text-primary)] mb-1">
                            Card Number <span className="text-[color:var(--error,#FF4444)] ml-[2px]">*</span>
                          </label>
                          <input 
                            type="text" 
                            placeholder="e.g. 4111 1111 1111 1111"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            onBlur={() => handleBlur("cardNumber")}
                            className={`w-full bg-[color:var(--bg-card)] border ${touched.cardNumber && errors.cardNumber ? 'border-red-500' : (touched.cardNumber && !errors.cardNumber ? 'border-green-500' : 'border-[color:var(--bg-primary)]')} rounded-lg px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]`}
                          />
                          {touched.cardNumber && errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-[color:var(--text-primary)] mb-1">
                              Expiry Date <span className="text-[color:var(--error,#FF4444)] ml-[2px]">*</span>
                            </label>
                            <input 
                              type="text" 
                              placeholder="MM/YY"
                              value={expiry}
                              onChange={handleExpiryChange}
                              onBlur={() => handleBlur("expiry")}
                              className={`w-full bg-[color:var(--bg-card)] border ${touched.expiry && errors.expiry ? 'border-red-500' : (touched.expiry && !errors.expiry ? 'border-green-500' : 'border-[color:var(--bg-primary)]')} rounded-lg px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]`}
                            />
                            {touched.expiry && errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[color:var(--text-primary)] mb-1">
                              CVV <span className="text-[color:var(--error,#FF4444)] ml-[2px]">*</span>
                            </label>
                            <input 
                              type="text" 
                              placeholder="123"
                              maxLength={3}
                              value={cvv}
                              onChange={e => setCvv(e.target.value.replace(/\D/g, ""))}
                              onBlur={() => handleBlur("cvv")}
                              className={`w-full bg-[color:var(--bg-card)] border ${touched.cvv && errors.cvv ? 'border-red-500' : (touched.cvv && !errors.cvv ? 'border-green-500' : 'border-[color:var(--bg-primary)]')} rounded-lg px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]`}
                            />
                            {touched.cvv && errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className={`border rounded-xl transition-colors ${paymentMethod === 'paypal' ? 'border-[color:var(--accent)] bg-[color:var(--accent)]/5' : 'border-[color:var(--bg-primary)]'}`}>
                <label className="flex items-center p-4 cursor-pointer">
                  <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="accent-[color:var(--accent)] w-5 h-5" />
                  <span className="ml-4 font-bold text-[color:var(--text-primary)] flex-1 font-syne text-lg tracking-tight italic">PayPal</span>
                  <img src={paypalIcon} alt="PayPal" className="h-7 w-auto object-contain" />
                </label>
                
                <AnimatePresence>
                  {paymentMethod === 'paypal' && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="p-4 pt-0 space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-[color:var(--text-primary)] mb-1">
                            PayPal account email <span className="text-[color:var(--error,#FF4444)] ml-[2px]">*</span>
                          </label>
                          <input 
                            type="email" 
                            placeholder="you@example.com"
                            value={paypalEmail}
                            onChange={e => setPayPalEmail(e.target.value)}
                            onBlur={() => handleBlur("paypalEmail")}
                            className={`w-full bg-[color:var(--bg-card)] border ${touched.paypalEmail && errors.paypalEmail ? 'border-red-500' : (touched.paypalEmail && !errors.paypalEmail ? 'border-green-500' : 'border-[color:var(--bg-primary)]')} rounded-lg px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]`}
                          />
                          {touched.paypalEmail && errors.paypalEmail && <p className="text-red-500 text-xs mt-1">{errors.paypalEmail}</p>}
                        </div>
                        <button 
                          type="button" 
                          onClick={() => {
                            if (!paypalEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypalEmail)) {
                              setTouched(prev => ({ ...prev, paypalEmail: true }));
                              validate();
                              return;
                            }
                            processPayment();
                          }}
                          disabled={isProcessing}
                          className="w-full py-3 bg-[#0070ba] text-white font-bold rounded-lg hover:opacity-90 flex justify-center items-center transition-opacity"
                        >
                          {isProcessing && paymentMethod === 'paypal' ? (
                            <span className="animate-spin inline-block border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                          ) : (
                            "Log in to PayPal"
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </section>

          {paymentMethod === 'visa' && (
            <button 
              onClick={processPayment}
              disabled={isProcessing}
              className="w-full py-4 bg-[color:var(--accent)] text-[color:var(--text-on-accent)] rounded-full font-bold text-lg hover:opacity-90 transition-opacity flex justify-center items-center"
            >
              {isProcessing ? (
                <span className="animate-spin inline-block border-2 border-current border-t-transparent rounded-full w-6 h-6"></span>
              ) : (
                "Place Order"
              )}
            </button>
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="bg-[color:var(--bg-card)] rounded-2xl p-6 md:p-8 sticky top-24">
            <h2 className="text-2xl font-syne text-[color:var(--text-primary)] mb-6">Order Review</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={item.cartItemId} className="flex gap-4 items-center">
                  <div className="w-16 h-20 rounded-lg overflow-hidden bg-[color:var(--bg-primary)] flex-shrink-0">
                    <ImageWithFallback src={item.product.images.main} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-space text-sm font-bold text-[color:var(--text-primary)] leading-tight">{item.product.name}</h3>
                    <p className="text-xs text-[color:var(--text-primary)] opacity-70 mt-1">{item.caseType} • {item.color}</p>
                    <p className="text-xs text-[color:var(--text-primary)] opacity-70">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-syne font-bold text-[color:var(--text-primary)]">€{(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-[color:var(--bg-primary)] border-opacity-20 pt-6 space-y-3">
              <div className="flex justify-between text-sm text-[color:var(--text-primary)] opacity-80">
                <span>Subtotal</span>
                <span>€{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-[color:var(--text-primary)] opacity-80">
                <span>Delivery</span>
                <span>{delivery === 0 ? 'Free' : `€${delivery.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-[color:var(--bg-primary)] border-opacity-20 pt-4 flex justify-between items-center">
                <span className="font-space font-bold text-lg text-[color:var(--text-primary)]">Total</span>
                <span className="font-syne font-bold text-2xl text-[color:var(--text-primary)]">€{grandTotal.toFixed(2)}</span>
              </div>
            </div>
            
            {delivery > 0 && (
              <p className="text-xs text-center mt-4 text-[color:var(--text-primary)] opacity-60">
                Add €{(40 - total).toFixed(2)} more to your cart to get free delivery.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
