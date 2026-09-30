from manim import *

class R23SyllabusUnit(Scene):
    def construct(self):
        # Header banner
        header = Text("Narayana R23 - CSE (AI & DS)", font_size=28, color=BLUE)
        header.to_edge(UP)
        self.play(Write(header))
        
        # Topic Title
        topic = Text("Unit I: Linear Data Structures - Stacks & Queues", font_size=24, color=WHITE)
        topic.next_to(header, DOWN, buff=0.5)
        self.play(FadeIn(topic))
        
        # Visualizing Stack Push Operation
        box1 = Square(side_length=0.8, color=BLUE).shift(DOWN * 1.5 + LEFT * 2)
        box2 = Square(side_length=0.8, color=BLUE).shift(DOWN * 0.5 + LEFT * 2)
        label_stack = Text("Stack (LIFO)", font_size=20, color=YELLOW).next_to(box2, UP)
        
        self.play(Create(box1), Create(box2), Write(label_stack))
        
        # Element entering stack
        element = Square(side_length=0.8, color=GREEN).shift(UP * 1.5 + LEFT * 2)
        elem_text = Text("Push", font_size=18).move_to(element.get_center())
        
        self.play(FadeIn(element), Write(elem_text))
        self.play(element.animate.shift(DOWN * 1.8), elem_text.animate.shift(DOWN * 1.8))
        
        # Conclusion summary
        summary = Text("Optimized O(1) time complexity for insertions.", font_size=20, color=GREEN)
        summary.to_edge(DOWN)
        self.play(Write(summary))
        self.wait(2)
