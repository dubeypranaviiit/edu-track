import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';

interface Question {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  questions: Question[];
}

export const PreviewModal: React.FC<Props> = ({ open, onClose, questions }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Preview Quiz</DialogTitle>
        </DialogHeader>

        <div className="space-y-8 mt-4">
          {questions.map((q, idx) => (
            <div key={idx} className="border p-4 rounded-xl shadow-sm space-y-4">
              <div className="text-lg font-medium">
                Q{idx + 1}: {q.questionText}
              </div>

              <RadioGroup value={String(q.correctAnswerIndex)} disabled className="space-y-2">
                {q.options.map((opt, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <RadioGroupItem value={String(i)} id={`preview-q-${idx}-opt-${i}`} disabled />
                    <label htmlFor={`preview-q-${idx}-opt-${i}`}>{opt}</label>
                    {i === q.correctAnswerIndex && (
                      <Badge className="ml-2" variant="outline">
                        Correct
                      </Badge>
                    )}
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
