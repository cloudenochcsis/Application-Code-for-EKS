<script setup>
import { ref } from 'vue';
import axios from 'axios';
import BookingForm from './BookingForm.vue';

const selectedDate = ref('');
const eventType = ref('Wedding'); // Default event type
const isAvailable = ref(null);
const isLoading = ref(false);
const errorMessage = ref('');
const bookingSuccess = ref(false);
const successMessage = ref('');

const checkAvailability = async () => {
  if (!selectedDate.value) {
    errorMessage.value = 'Please select a date.';
    return;
  }
  isLoading.value = true;
  errorMessage.value = '';
  isAvailable.value = null;
  bookingSuccess.value = false;
  successMessage.value = '';

  try {
    const response = await axios.get(`http://localhost:3000/availability?date=${selectedDate.value}`);
    isAvailable.value = response.data.available;
  } catch (error) {
    console.error('Error checking availability:', error);
    errorMessage.value = 'Failed to check availability. Please try again.';
  }
  isLoading.value = false;
};

const handleBookingSuccess = () => {
  // Show success message and hide booking form
  bookingSuccess.value = true;
  successMessage.value = 'Booking confirmed successfully!';
  isAvailable.value = null; // Hide the booking form
  
  // Reset form after 3 seconds to allow new bookings
  setTimeout(() => {
    bookingSuccess.value = false;
    successMessage.value = '';
    selectedDate.value = '';
    eventType.value = 'Wedding';
  }, 3000);
}

</script>

<template>
  <div class="max-w-2xl mx-auto">
    <!-- Main Booking Card -->
    <div class="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
      <div class="bg-gradient-to-r from-brand-primary to-brand-secondary p-6">
        <h3 class="text-2xl font-bold text-white text-center mb-2">Check Availability</h3>
        <p class="text-blue-100 text-center">Select your preferred date and event type</p>
      </div>
      
      <div class="p-8">
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <!-- Date Selection -->
          <div class="space-y-2">
            <label for="date-picker" class="block text-sm font-semibold text-brand-dark mb-3">
              <svg class="w-5 h-5 inline mr-2 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Select Date
            </label>
            <input 
              type="date" 
              id="date-picker" 
              v-model="selectedDate" 
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-secondary focus:ring-4 focus:ring-brand-secondary focus:ring-opacity-20 transition-all duration-200 text-brand-text-primary font-medium"
            />
          </div>
          
          <!-- Event Type Selection -->
          <div class="space-y-2">
            <label for="event-type" class="block text-sm font-semibold text-brand-dark mb-3">
              <svg class="w-5 h-5 inline mr-2 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              Event Type
            </label>
            <select 
              id="event-type" 
              v-model="eventType" 
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-secondary focus:ring-4 focus:ring-brand-secondary focus:ring-opacity-20 transition-all duration-200 text-brand-text-primary font-medium bg-white"
            >
              <option value="Wedding">💒 Wedding</option>
              <option value="Birthday Party">🎂 Birthday Party</option>
              <option value="Corporate Event">🏢 Corporate Event</option>
              <option value="Other">🎉 Other Celebration</option>
            </select>
          </div>
        </div>

        <!-- Check Availability Button -->
        <button 
          @click="checkAvailability" 
          :disabled="isLoading || !selectedDate" 
          class="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-dark hover:to-brand-primary text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
        >
          <span v-if="isLoading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Checking Availability...
          </span>
          <span v-else class="flex items-center justify-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Check Availability
          </span>
        </button>

        <!-- Error Message -->
        <div v-if="errorMessage" class="mt-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
          <div class="flex">
            <svg class="w-5 h-5 text-red-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            <p class="text-red-700 font-medium">{{ errorMessage }}</p>
          </div>
        </div>

        <!-- Success Message After Booking -->
        <div v-if="bookingSuccess" class="mt-6 bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
          <div class="flex items-center">
            <svg class="w-8 h-8 text-green-400 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <div>
              <p class="text-green-800 font-bold text-lg">{{ successMessage }}</p>
              <p class="text-green-600 text-sm mt-1">Form will reset automatically...</p>
            </div>
          </div>
        </div>

        <!-- Available Date Result -->
        <div v-else-if="isAvailable === true" class="mt-6">
          <div class="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg mb-6">
            <div class="flex items-center">
              <svg class="w-6 h-6 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-green-800 font-bold text-lg">Great! This date is available!</p>
            </div>
          </div>
          <BookingForm :eventDate="selectedDate" :eventType="eventType" @booking-success="handleBookingSuccess" />
        </div>

        <!-- Unavailable Date Result -->
        <div v-else-if="isAvailable === false" class="mt-6 bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
          <div class="flex items-center">
            <svg class="w-8 h-8 text-red-400 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            <div>
              <p class="text-red-800 font-bold text-lg">Sorry, this date is already booked</p>
              <p class="text-red-600 text-sm mt-1">Please try selecting a different date for your event.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
