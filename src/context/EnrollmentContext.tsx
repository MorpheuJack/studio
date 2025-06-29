"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";
import type { Course } from '@/lib/courses';

interface EnrollmentContextType {
  enrolledCourses: Set<string>;
  enrollCourse: (course: Course) => void;
  isEnrolled: (courseId: string) => boolean;
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

export const EnrollmentProvider = ({ children }: { children: ReactNode }) => {
  const [enrolledCourses, setEnrolledCourses] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const enrollCourse = (course: Course) => {
    setEnrolledCourses(prev => {
      const newSet = new Set(prev);
      newSet.add(course.id);
      return newSet;
    });
    toast({
      title: "Inscrição bem-sucedida!",
      description: `Você se inscreveu com sucesso no curso "${course.title}".`,
      variant: "success",
    });
  };

  const isEnrolled = (courseId: string) => {
    return enrolledCourses.has(courseId);
  };

  return (
    <EnrollmentContext.Provider value={{ enrolledCourses, enrollCourse, isEnrolled }}>
      {children}
    </EnrollmentContext.Provider>
  );
};

export const useEnrollment = () => {
  const context = useContext(EnrollmentContext);
  if (context === undefined) {
    throw new Error('useEnrollment must be used within an EnrollmentProvider');
  }
  return context;
};
