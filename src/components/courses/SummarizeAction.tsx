"use client";

import { useState, useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { summarizeLessonAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Wand2, Loader2 } from 'lucide-react';

interface SummarizeActionProps {
  lessonContent: string;
}

const initialState = {
  success: false,
  summary: undefined,
  error: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Summarizing...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Summarize with AI
        </>
      )}
    </Button>
  );
}

export function SummarizeAction({ lessonContent }: SummarizeActionProps) {
  const [state, formAction] = useActionState(summarizeLessonAction, initialState);
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (state?.success && state?.summary) {
      setDialogOpen(true);
    }
    if (state?.error) {
        setDialogOpen(true);
    }
  }, [state]);

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="lessonContent" value={lessonContent} />
        <SubmitButton />
      </form>

      <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
                {state.success ? "Lesson Summary" : "Error"}
            </AlertDialogTitle>
            <AlertDialogDescription className="max-h-[60vh] overflow-y-auto">
                {state.success && state.summary}
                {state.error && `An error occurred: ${state.error}`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
