<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import axios from 'axios';

const props = defineProps({
  eventDate: String,
  eventType: String,
});

const emit = defineEmits(['booking-success']);

const customerName = ref('');
const customerEmail = ref('');
const customerPhone = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const submitBooking = async () => {
  if (!customerName.value || !customerEmail.value) {
    errorMessage.value = 'Please fill in your name and email.';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const response = await axios.post('http://localhost:3000/book', {
      event_date: props.eventDate,
      event_type: props.eventType,
      customer_name: customerName.value,
      customer_email: customerEmail.value,
      customer_phone: customerPhone.value,
    });
    successMessage.value = response.data.message;
    emit('booking-success');
  } catch (error) {
    console.error('Error submitting booking:', error);
    errorMessage.value = error.response?.data?.message || 'Failed to submit booking. Please try again.';
  }
  isLoading.value = false;
};
</script>

<template>
  <div class="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border-2 border-green-200">
    <div class="text-center mb-8">
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <h2 class="text-3xl font-bold text-brand-dark mb-2">Secure Your Date</h2>
      <p class="text-brand-text-secondary">Fill in your details to confirm your booking</p>
    </div>

    <form @submit.prevent="submitBooking" class="space-y-6">
      <!-- Event Summary -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 class="font-semibold text-brand-dark mb-3 flex items-center">
          <svg class="w-5 h-5 mr-2 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Event Summary
        </h3>
        <div class="grid md:grid-cols-2 gap-4 text-sm">
          <div class="flex justify-between">
            <span class="text-brand-text-secondary">Date:</span>
            <span class="font-medium text-brand-dark">{{ new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-brand-text-secondary">Event Type:</span>
            <span class="font-medium text-brand-dark">{{ eventType }}</span>
          </div>
        </div>
      </div>

      <!-- Customer Information -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 class="font-semibold text-brand-dark mb-6 flex items-center">
          <svg class="w-5 h-5 mr-2 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          Your Information
        </h3>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label for="customer-name" class="block text-sm font-semibold text-brand-dark">
              Full Name *
            </label>
            <input 
              type="text" 
              id="customer-name" 
              v-model="customerName" 
              required 
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-secondary focus:ring-4 focus:ring-brand-secondary focus:ring-opacity-20 transition-all duration-200 text-brand-text-primary font-medium"
              placeholder="Enter your full name"
            />
          </div>
          
          <div class="space-y-2">
            <label for="customer-email" class="block text-sm font-semibold text-brand-dark">
              Email Address *
            </label>
            <input 
              type="email" 
              id="customer-email" 
              v-model="customerEmail" 
              required 
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-secondary focus:ring-4 focus:ring-brand-secondary focus:ring-opacity-20 transition-all duration-200 text-brand-text-primary font-medium"
              placeholder="your.email@example.com"
            />
          </div>
        </div>
        
        <div class="mt-6">
          <label for="customer-phone" class="block text-sm font-semibold text-brand-dark mb-2">
            Phone Number (Optional)
          </label>
          <input 
            type="tel" 
            id="customer-phone" 
            v-model="customerPhone" 
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-secondary focus:ring-4 focus:ring-brand-secondary focus:ring-opacity-20 transition-all duration-200 text-brand-text-primary font-medium"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      <!-- Terms and Confirmation -->
      <div class="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <div class="flex items-start">
          <svg class="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div class="text-sm text-blue-800">
            <p class="font-medium mb-1">Booking Confirmation</p>
            <p>By submitting this form, you confirm that the information provided is accurate and you agree to our booking terms. You will receive a confirmation email shortly after booking.</p>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <button 
        type="submit" 
        :disabled="isLoading || !customerName || !customerEmail" 
        class="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
      >
        <span v-if="isLoading" class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing Your Booking...
        </span>
        <span v-else class="flex items-center justify-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Confirm Booking
        </span>
      </button>
    </form>
  </div>
</template>
