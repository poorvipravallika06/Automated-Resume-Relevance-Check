/**
 * Collection ID: mentors
 * Interface for Mentors
 */
export interface Mentors {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  mentorName?: string;
  /** @wixFieldType text */
  expertise?: string;
  /** @wixFieldType text */
  bio?: string;
  /** @wixFieldType image */
  profilePicture?: string;
  /** @wixFieldType boolean */
  hasTrialSession?: boolean;
  /** @wixFieldType number */
  hourlyRate?: number;
  /** @wixFieldType url */
  bookingLink?: string;
}
